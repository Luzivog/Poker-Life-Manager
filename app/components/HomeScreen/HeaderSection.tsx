import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "@/config/styles";

interface HeaderSectionProps {
  title: string;
  onProfilePress: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, onProfilePress }) => {
  return (
    <View style={globalStyles.screenHeader}>
      <Text style={globalStyles.screenTitle}>{title}</Text>
      <TouchableOpacity onPress={onProfilePress}>
        <Ionicons 
          name="person-circle-outline" 
          style={globalStyles.rightIconButton} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSection;