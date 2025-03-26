import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Session } from '@/config/types';
import { globalStyles } from '@/config/styles';
import { COLORS } from '@/config/variables';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Auth.native';
import { updateSession } from '../services/sessionService';

// Import modular components
import SessionHeader from '../components/SessionDetails/SessionHeader';
import BackButton from '../components/SessionDetails/BackButton';
import EditButton from '../components/SessionDetails/EditButton';
import GameInfoSection from '../components/SessionDetails/GameInfoSection';
import SessionInfoSection from '../components/SessionDetails/SessionInfoSection';
import FinancialSection from '../components/SessionDetails/FinancialSection';
import NotesSection from '../components/SessionDetails/NotesSection';
import AddSessionMenu from '../components/AddSessionMenu';

export default function SessionDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();

  // Parse the session data from params and set initial state
  const initialSession = params.session ? JSON.parse(params.session as string) as (Session & { id: string }) : null;
  
  // Keep track of session data in state to update it in-place
  const [sessionData, setSessionData] = useState(initialSession);
  
  // State for edit mode
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [editSessionData, setEditSessionData] = useState<Session | null>(null);
  
  if (!sessionData) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white', fontSize: 18 }}>Session not found</Text>
        <TouchableOpacity 
          style={{ marginTop: 20, padding: 10 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: COLORS.primary, fontSize: 16 }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Handle opening the edit menu
  const handleEditSession = () => {
    // Convert string dates to Date objects
    const sessionWithDates: Session = {
      ...sessionData,
      start_time: new Date(sessionData.start_time),
      end_time: new Date(sessionData.end_time)
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

  // Calculate profit for header
  const profit = sessionData.cash_out - sessionData.buy_in;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <BackButton />
        <Text style={globalStyles.screenTitle}>Session Details</Text>
        <EditButton onPress={handleEditSession} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          {/* Session Header with game type and profit */}
          <SessionHeader game_type={sessionData.game_type} profit={profit} />

          {/* Game Info Section */}
          <GameInfoSection sessionData={sessionData} />

          {/* Session Info Section */}
          <SessionInfoSection sessionData={sessionData} />

          {/* Financial Section */}
          <FinancialSection sessionData={sessionData} />

          {/* Notes Section (conditionally rendered) */}
          <NotesSection notes={sessionData.notes} />
        </View>
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
});