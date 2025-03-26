import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Session } from '@/config/types';
import { COLORS } from '@/config/variables';
import { useRouter } from 'expo-router';

interface SessionListProps {
  sessions: (Session & { id: string })[];
  loading: boolean;
}

const SessionList = ({ sessions, loading }: SessionListProps) => {
  const router = useRouter();
  
  // Helper function to calculate session duration
  const calculateDuration = (start: Date, end: Date): string => {
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Helper function to format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const handleSessionPress = (session: Session & { id: string }) => {
    router.push({
      pathname: '/sessionDetails',
      params: { session: JSON.stringify(session) }
    });
  };
  
  const renderSession = ({ item }: { item: Session & { id: string } }) => {
    const profit = item.cash_out - item.buy_in;
    const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;
    const duration = calculateDuration(item.start_time, item.end_time);
    const sessionDate = formatDate(item.start_time);
    
    return (
      <TouchableOpacity 
        style={styles.sessionItem}
        onPress={() => handleSessionPress(item)}
      >
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionLocation}>{item.location}</Text>
          <Text style={styles.sessionDate}>{sessionDate}</Text>
        </View>
        <Text style={styles.sessionGame}>{item.game_type} {item.small_blind}/{item.big_blind}</Text>
        
        <View style={styles.sessionDetails}>
          <Text style={styles.sessionDuration}>Duration: {duration}</Text>
          <Text style={[styles.sessionProfit, { color: profitColor }]}>
            {profit >= 0 ? '+' : ''}{profit}$
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={sessions}
      renderItem={renderSession}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.sessionsList}
      ListEmptyComponent={
        <Text style={styles.emptyListText}>
          {loading ? 'Loading sessions...' : 'No sessions yet. Tap "Add" to create one.'}
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  sessionsList: {
    padding: 10,
  },
  sessionItem: {
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sessionLocation: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionDate: {
    color: '#cccccc',
    fontSize: 14,
  },
  sessionGame: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 5,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionDuration: {
    color: '#cccccc',
    fontSize: 14,
  },
  sessionProfit: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyListText: {
    color: '#aaaaaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  }
});

export default SessionList;