import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/config/variables';

interface StatsCardProps {
  title: string;
  children: ReactNode;
}

const StatsCard = ({ title, children }: StatsCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
};

export const StatRow = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.statRow}>
      {children}
    </View>
  );
};

export const StatItem = ({ label, value, valueColor }: { 
  label: string; 
  value: string | number; 
  valueColor?: string 
}) => {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[
        styles.statValue, 
        valueColor ? { color: valueColor } : {}
      ]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    marginBottom: 15,
  },
  cardTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default StatsCard;