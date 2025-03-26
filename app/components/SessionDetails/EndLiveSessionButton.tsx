import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '@/config/variables';
import { globalStyles } from '@/config/styles';

interface EndLiveSessionButtonProps {
  onPress: () => void;
}

const EndLiveSessionButton: React.FC<EndLiveSessionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={[globalStyles.liveSessionButton, styles.endLiveSessionButton]}
      onPress={onPress}
    >
      <View style={styles.endLiveSquare} />
      <Text style={styles.endLiveSessionText}>End Live Session</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  endLiveSessionButton: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: COLORS.red,
    bottom: 30,
  },
  endLiveSessionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  endLiveSquare: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.red || '#FF0000',
    marginRight: 8,
  },
});

export default EndLiveSessionButton;