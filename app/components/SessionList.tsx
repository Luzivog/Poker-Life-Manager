import React, { useMemo } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LiveSessionWithId, SessionWithId } from '@/config/types';
import { COLORS } from '@/config/variables';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SessionListProps {
  sessions: (SessionWithId)[];
  loading: boolean;
}

const SessionList = ({ sessions, loading }: SessionListProps) => {
  const router = useRouter();
  
  // Helper function to calculate session duration
  const calculateDuration = (start: Date, end: Date | undefined): string => {
    if (!end) {
      // For live sessions, calculate duration from start to now
      const durationMs = new Date().getTime() - new Date(start).getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
    
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
  
  const handleSessionPress = (session: SessionWithId) => {
    // Direct to the appropriate screen based on session status
    const pathname = session.status === 'live' ? '/liveSessionDetails' : '/sessionDetails';
    
    router.push({
      pathname,
      params: { session: JSON.stringify(session) }
    });
  };
  
  const renderSession = ({ item }: { item: SessionWithId }) => {
    const isLive = item.status === 'live';
    const profit = isLive ? 0 : (item.cash_out || 0) - item.buy_in;
    const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;
    const duration = calculateDuration(item.start_time, item.end_time);
    const sessionDate = formatDate(item.start_time);
    
    return (
      <TouchableOpacity 
        style={[styles.sessionItem, isLive && styles.liveSessionItem]}
        onPress={() => handleSessionPress(item)}
      >
        {isLive && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
        
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionLocation}>{item.location}</Text>
          <Text style={styles.sessionDate}>{sessionDate}</Text>
        </View>
        <Text style={styles.sessionGame}>{item.game_type} {item.small_blind}/{item.big_blind}</Text>
        
        <View style={styles.sessionDetails}>
          <Text style={styles.sessionDuration}>
            {isLive ? (
              <View style={styles.durationContainer}>
                <Ionicons name="time" size={16} color="#cccccc" style={styles.durationIcon} />
                <Text style={styles.sessionDuration}>{duration}</Text>
              </View>
            ) : (
              `Duration: ${duration}`
            )}
          </Text>
          {!isLive && (
            <Text style={[styles.sessionProfit, { color: profitColor }]}>
              {profit >= 0 ? '+' : ''}{profit}$
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sessions}
        renderItem={renderSession}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.sessionsList}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            {loading ? 'Loading sessions...' : 'No sessions yet. Tap "Add" to create one.'}
          </Text>
        }
      />
  </View>
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
  liveSessionItem: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    position: 'relative',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 5,
  },
  liveText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    marginRight: 4,
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