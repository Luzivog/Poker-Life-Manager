import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/config/variables';

interface SessionHeaderProps {
  game_type: string;
  profit: number;
}

const SessionHeader = ({ game_type, profit }: SessionHeaderProps) => {
  const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;
  
  return (
    <View style={styles.headerSection}>
      <Text style={styles.game_type}>{game_type}</Text>
      <Text style={[styles.profit, { color: profitColor }]}>
        {profit >= 0 ? '+' : ''}{profit}$
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  game_type: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profit: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default SessionHeader;