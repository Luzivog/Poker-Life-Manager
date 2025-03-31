import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoadingViewProps {
  message?: string;
}

const LoadingView: React.FC<LoadingViewProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoadingView;