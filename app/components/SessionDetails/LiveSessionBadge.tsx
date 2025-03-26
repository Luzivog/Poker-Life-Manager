import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/config/variables';

const LiveSessionBadge = () => {
  return (
    <View style={styles.liveBadgeContainer}>
      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveBadgeText}>LIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  liveBadgeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 168, 80, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  liveBadgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LiveSessionBadge;