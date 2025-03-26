import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Session } from '@/config/types';
import { globalStyles } from '@/config/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Auth.native';
import { updateSession, endLiveSession } from '../services/sessionService';

// Import modular components
import BackButton from '../components/SessionDetails/BackButton';
import EditButton from '../components/SessionDetails/EditButton';
import AddSessionMenu from '../components/AddSessionMenu';
import EndLiveSessionModal from '../components/EndLiveSessionModal';
import SessionNotFoundView from '../components/SessionDetails/SessionNotFoundView';
import SessionDetailsContent from '../components/SessionDetails/SessionDetailsContent';
import EndLiveSessionButton from '../components/SessionDetails/EndLiveSessionButton';

export default function SessionDetailsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();

  // Parse the session data from params and set initial state
  const initialSession = params.session ? JSON.parse(params.session as string) as (Session & { id: string }) : null;
  
  // Keep track of session data in state to update it in-place
  const [sessionData, setSessionData] = useState(initialSession);
  
  // State for edit mode
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [editSessionData, setEditSessionData] = useState<Session | null>(null);
  
  // State for end live session modal
  const [isEndLiveModalVisible, setIsEndLiveModalVisible] = useState(false);
  
  // Check if this is a live session
  const isLiveSession = sessionData?.status === 'live';

  // If no session data is found, show the not found view
  if (!sessionData) {
    return <SessionNotFoundView />;
  }
  
  // Handle opening the edit menu
  const handleEditSession = () => {
    // Convert string dates to Date objects and handle optional fields
    const sessionWithDates: Session = {
      ...sessionData,
      start_time: new Date(sessionData.start_time),
      end_time: sessionData.end_time ? new Date(sessionData.end_time) : undefined
    };
    setEditSessionData(sessionWithDates);
    setIsEditMenuVisible(true);
  };

  // Handle value changes in the edit menu
  const handleValueChange = (key: keyof Session, value: any) => {
    if (editSessionData) {
      setEditSessionData(prev => ({
        ...prev!,
        [key]: value
      }));
    }
  };

  // Handle save session
  const handleSaveSession = async () => {
    if (!editSessionData || !user) {
      setIsEditMenuVisible(false);
      return;
    }

    try {
      const { session: updatedSession, error } = await updateSession(editSessionData, sessionData.id);
      
      if (error) {
        Alert.alert('Error', 'Failed to update session');
      } else {
        Alert.alert('Success', 'Session updated successfully');
        // Update the session data in state instead of navigating
        setSessionData(updatedSession);
      }
    } catch (error) {
      console.error('Exception in handleSaveSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsEditMenuVisible(false);
    }
  };

  // Handle showing end live session modal
  const handleShowEndLiveSession = () => {
    setIsEndLiveModalVisible(true);
  };

  // Handle ending a live session
  const handleEndLiveSession = async (cashOut: number) => {
    if (!user) {
      setIsEndLiveModalVisible(false);
      return;
    }

    try {
      const { session: updatedSession, error } = await endLiveSession(sessionData.id, cashOut);
      
      if (error) {
        Alert.alert('Error', 'Failed to end live session');
      } else {
        Alert.alert('Success', 'Session ended successfully');
        // Update the session data in state
        setSessionData(updatedSession);
      }
    } catch (error) {
      console.error('Exception in handleEndLiveSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsEndLiveModalVisible(false);
    }
  };

  // Calculate profit for header (only if this is not a live session)
  const profit = !isLiveSession && sessionData.cash_out !== undefined 
    ? sessionData.cash_out - sessionData.buy_in 
    : 0;

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Screen Header with Back/Edit buttons */}
      <View style={globalStyles.screenHeader}>
        <BackButton />
        <Text style={globalStyles.screenTitle}>
          {isLiveSession ? 'Live Session' : 'Session Details'}
        </Text>
        {!isLiveSession && <EditButton onPress={handleEditSession} />}
      </View>

      {/* Main session content */}
      <SessionDetailsContent 
        sessionData={sessionData}
        isLiveSession={isLiveSession}
        profit={profit}
      />

      {/* End Live Session Button - Only show for live sessions */}
      {isLiveSession && (
        <EndLiveSessionButton onPress={handleShowEndLiveSession} />
      )}

      {/* Add Session Menu for editing */}
      {editSessionData && (
        <AddSessionMenu
          visible={isEditMenuVisible}
          sessionData={editSessionData}
          onCancel={() => setIsEditMenuVisible(false)}
          onFinish={handleSaveSession}
          onValueChange={handleValueChange}
        />
      )}

      {/* End Live Session Modal */}
      <EndLiveSessionModal
        visible={isEndLiveModalVisible}
        onClose={() => setIsEndLiveModalVisible(false)}
        onEndSession={handleEndLiveSession}
        session={sessionData}
      />
    </SafeAreaView>
  );
}