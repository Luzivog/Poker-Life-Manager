import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/config/styles';
import { COLORS } from '@/config/variables';

const SessionNotFoundView = () => {
  const router = useRouter();
  
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
};

export default SessionNotFoundView;