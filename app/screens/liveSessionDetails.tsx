import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { LiveSessionWithId, Session } from '@/config/types';
import { globalStyles } from '@/config/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Auth.native';
import { endLiveSession } from '../services/sessionService';

// Import modular components
import BackButton from '../components/SessionDetails/BackButton';
import EndLiveSessionModal from '../components/EndLiveSessionModal';
import SessionNotFoundView from '../components/SessionDetails/SessionNotFoundView';
import SessionDetailsContent from '../components/SessionDetails/SessionDetailsContent';
import EndLiveSessionButton from '../components/SessionDetails/EndLiveSessionButton';

export default function LiveSessionDetailsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  // Parse the session data from params and set initial state
  const initialSession = params.session ? JSON.parse(params.session as string) as (LiveSessionWithId) : null;
  
  // Keep track of session data in state to update it in-place
  const [sessionData, setSessionData] = useState(initialSession);
  
  // State for end live session modal
  const [isEndLiveModalVisible, setIsEndLiveModalVisible] = useState(false);
  
  // If no session data is found, show the not found view
  if (!sessionData) {
    return <SessionNotFoundView />;
  }

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
        Alert.alert(
          'Success', 
          'Session ended successfully',
          [
            { 
              text: 'OK', 
              onPress: () => router.back() 
            }
          ]
        );
      }
    } catch (error) {
      console.error('Exception in handleEndLiveSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsEndLiveModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Screen Header with Back button */}
      <View style={globalStyles.screenHeader}>
        <BackButton />
        <Text style={globalStyles.screenTitle}>Live Session</Text>
      </View>

      {/* Main session content */}
      <SessionDetailsContent 
        sessionData={sessionData}
        isLiveSession={true}
        profit={0} // Live sessions don't have profit yet
      />

      {/* End Live Session Button */}
      <EndLiveSessionButton onPress={handleShowEndLiveSession} />

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