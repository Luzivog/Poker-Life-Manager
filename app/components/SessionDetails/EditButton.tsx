import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/config/variables';

interface EditButtonProps {
  onPress: () => void;
  color?: string;
  size?: number;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  onPress, 
  color = COLORS.primary, 
  size = 24 
}) => {
  return (
    <TouchableOpacity 
      style={styles.editButton} 
      onPress={onPress}
    >
      <Ionicons name="create-outline" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    marginLeft: 'auto',
  },
});

export default EditButton;