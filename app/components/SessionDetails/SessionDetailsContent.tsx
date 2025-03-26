import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Session } from '@/config/types';
import SessionHeader from './SessionHeader';
import GameInfoSection from './GameInfoSection';
import SessionInfoSection from './SessionInfoSection';
import FinancialSection from './FinancialSection';
import NotesSection from './NotesSection';
import LiveSessionBadge from './LiveSessionBadge';

interface SessionDetailsContentProps {
  sessionData: Session & { id: string };
  isLiveSession: boolean;
  profit: number;
}

const SessionDetailsContent: React.FC<SessionDetailsContentProps> = ({
  sessionData,
  isLiveSession,
  profit
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Live Session Badge */}
        {isLiveSession && <LiveSessionBadge />}

        {/* Session Header with game type and profit */}
        <SessionHeader game_type={sessionData.game_type} profit={profit} />

        {/* Game Info Section */}
        <GameInfoSection sessionData={sessionData} />

        {/* Session Info Section */}
        <SessionInfoSection sessionData={sessionData} />

        {/* Financial Section - Only show for completed sessions */}
        {!isLiveSession && <FinancialSection sessionData={sessionData} />}

        {/* Notes Section (conditionally rendered) */}
        <NotesSection notes={sessionData.notes} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    marginBottom: 80, // Extra bottom margin for end session button
  },
});

export default SessionDetailsContent;