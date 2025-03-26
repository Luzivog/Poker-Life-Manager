import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Session } from '@/config/types';
import { globalStyles } from '@/config/styles';
import { COLORS } from '@/config/variables';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Auth.native';
import { updateSession } from '../services/sessionService';

// Import new components
import SessionHeader from '../components/SessionDetails/SessionHeader';
import InfoSection, { InfoRow } from '../components/SessionDetails/InfoSection';
import { formatDate, calculateDuration } from '../components/SessionDetails/utils';
import AddSessionMenu from '../components/AddSessionMenu';

export default function SessionDetailsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { user } = useAuth();

  // Parse the session data from params and set initial state
  const initialSession = params.session ? JSON.parse(params.session as string) as (Session & { id: string }) : null;
  
  // Keep track of session data in state to update it in-place
  const [sessionData, setSessionData] = useState(initialSession);
  
  // State for edit mode
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [editSessionData, setEditSessionData] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  // Calculate profit
  const profit = sessionData.cash_out - sessionData.buy_in;
  const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;

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
      setIsLoading(true);
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
      setIsLoading(false);
      setIsEditMenuVisible(false);
    }
  };

  // Rest of the component remains the same but using sessionData instead of session
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={globalStyles.screenTitle}>Session Details</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditSession}
        >
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          {/* Use the SessionHeader component */}
          <SessionHeader location={sessionData.location} profit={profit} />

          {/* Game Info Section */}
          <InfoSection title="Game Info">
            <InfoRow label="Game Type:" value={sessionData.game_type} />
            <InfoRow label="Stakes:" value={`${sessionData.small_blind}/${sessionData.big_blind}`} />
            <InfoRow label="Table Size:" value={sessionData.table_size} />
          </InfoSection>

          {/* Session Info Section */}
          <InfoSection title="Session Info">
            <InfoRow label="Start Time:" value={formatDate(sessionData.start_time)} />
            <InfoRow label="End Time:" value={formatDate(sessionData.end_time)} />
            <InfoRow label="Duration:" value={calculateDuration(sessionData.start_time, sessionData.end_time)} />
          </InfoSection>

          {/* Financial Section */}
          <InfoSection title="Financial">
            <InfoRow label="Buy-in:" value={`${sessionData.buy_in}$`} />
            <InfoRow label="Cash Out:" value={`${sessionData.cash_out}$`} />
            <InfoRow 
              label="Profit/Loss:" 
              value={`${profit >= 0 ? '+' : ''}${profit}$`} 
              valueColor={profitColor}
            />
          </InfoSection>

          {/* Notes Section (conditionally rendered) */}
          {sessionData.notes && (
            <InfoSection title="Notes">
              <Text style={styles.notes}>{sessionData.notes}</Text>
            </InfoSection>
          )}
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
  backButton: {
    marginRight: 10,
  },
  card: {
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  notes: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
  editButton: {
    marginLeft: 'auto',
  },
});