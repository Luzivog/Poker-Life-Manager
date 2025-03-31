import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { CompletedSessionWithId, Session, SessionWithId } from '@/config/types';
import { globalStyles } from '@/config/styles';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Auth.native';
import { updateSession } from '../services/sessionService';

// Import modular components
import BackButton from '../components/SessionDetails/BackButton';
import EditButton from '../components/SessionDetails/EditButton';
import AddSessionMenu from '../components/AddSessionMenu';
import SessionNotFoundView from '../components/SessionDetails/SessionNotFoundView';
import SessionDetailsContent from '../components/SessionDetails/SessionDetailsContent';

export default function SessionDetailsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();

  // Parse the session data from params and set initial state
  const initialSession = params.session ? JSON.parse(params.session as string) as (CompletedSessionWithId) : null;
  
  // Keep track of session data in state to update it in-place
  const [sessionData, setSessionData] = useState(initialSession);
  
  // State for edit mode
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [editSessionData, setEditSessionData] = useState<Session | null>(null);
  
  // If no session data is found, show the not found view
  if (!sessionData) {
    return <SessionNotFoundView />;
  }
  

  // Handle opening the edit menu
  const handleEditSession = () => {
    // Convert string dates to Date objects and handle optional fields
    const sessionWithDates: CompletedSessionWithId = {
      ...sessionData,
      start_time: new Date(sessionData.start_time),
      end_time: sessionData.end_time
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
        setSessionData(updatedSession as CompletedSessionWithId);
      }
    } catch (error) {
      console.error('Exception in handleSaveSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsEditMenuVisible(false);
    }
  };

  // Calculate profit
  const profit = sessionData.cash_out !== undefined 
    ? sessionData.cash_out - sessionData.buy_in 
    : 0;

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Screen Header with Back/Edit buttons */}
      <View style={globalStyles.screenHeader}>
        <BackButton />
        <Text style={globalStyles.screenTitle}>Session Details</Text>
        <EditButton onPress={handleEditSession} />
      </View>

      {/* Main session content */}
      <SessionDetailsContent 
        sessionData={sessionData}
        isLiveSession={false}
        profit={profit}
      />

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
    </SafeAreaView>
  );
}