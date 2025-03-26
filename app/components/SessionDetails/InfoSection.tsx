import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/config/variables';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
}

const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export const InfoRow = ({ label, value, valueColor }: { label: string, value: string, valueColor?: string }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor ? { color: valueColor } : {}]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 10,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#cccccc',
    fontSize: 16,
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default InfoSection;