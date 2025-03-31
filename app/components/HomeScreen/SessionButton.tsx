import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/config/styles';
import { COLORS } from '@/config/variables';
import { SessionWithId } from "@/config/types";

interface SessionButtonProps {
  existingLiveSession: SessionWithId | null;
  onStartNewSession: () => void;
  onNavigateToLiveSession: () => void;
}

const SessionButton: React.FC<SessionButtonProps> = ({
  existingLiveSession,
  onStartNewSession,
  onNavigateToLiveSession
}) => {
  if (existingLiveSession) {
    return (
      <TouchableOpacity 
        style={[globalStyles.liveSessionButton, styles.ongoingSessionButton]} 
        onPress={onNavigateToLiveSession}
      >
        <View style={styles.liveIndicator} />
        <Text style={styles.liveSessionButtonText}>Ongoing Live Session</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={globalStyles.liveSessionButton} 
      onPress={onStartNewSession}
    >
      <Ionicons name="play" size={20} color="white" style={styles.buttonIcon} />
      <Text style={styles.liveSessionButtonText}>Start a live session</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ongoingSessionButton: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonIcon: {
    marginRight: 10
  },
  liveSessionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  }
});

export default SessionButton;