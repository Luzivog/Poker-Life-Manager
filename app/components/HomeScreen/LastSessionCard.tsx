import React from 'react';
import StatsCard, { StatRow, StatItem } from './StatsCard';
import { formatDate } from './utils';
import { COLORS } from '@/config/variables';
import { SessionWithId } from '../../services/sessionService';
import { calculateDurationMs } from '../SessionDetails/utils';

interface LastSessionCardProps {
  session: SessionWithId;
}

const LastSessionCard = ({ session }: LastSessionCardProps) => {
  const profit = session.cash_out - session.buy_in;
  const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;
  
  // Calculate duration
  const durationMs = calculateDurationMs(session.start_time, session.end_time);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return (
    <StatsCard title="Last Session">
      <StatRow>
        <StatItem 
          label="Location" 
          value={session.location}
        />
        <StatItem 
          label="Date" 
          value={formatDate(session.start_time)}
        />
      </StatRow>
      
      <StatRow>
        <StatItem 
          label="Game" 
          value={`${session.game_type} ${session.small_blind}/${session.big_blind}`}
        />
        <StatItem 
          label="Duration" 
          value={`${hours}h ${minutes}m`}
        />
      </StatRow>
      
      <StatRow>
        <StatItem 
          label="Profit/Loss" 
          value={`${profit >= 0 ? '+' : ''}${profit}$`}
          valueColor={profitColor}
        />
      </StatRow>
    </StatsCard>
  );
};

export default LastSessionCard;