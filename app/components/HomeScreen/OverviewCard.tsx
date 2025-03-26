import React from 'react';
import StatsCard, { StatRow, StatItem } from './StatsCard';
import { SessionStats, formatCurrency, formatHourlyRate } from './utils';
import { COLORS } from '@/config/variables';

interface OverviewCardProps {
  stats: SessionStats;
}

const OverviewCard = ({ stats }: OverviewCardProps) => {
  return (
    <StatsCard title="Overview">
      <StatRow>
        <StatItem 
          label="Total Profit/Loss" 
          value={formatCurrency(stats.totalProfit)}
          valueColor={stats.totalProfit >= 0 ? COLORS.primary : COLORS.red}
        />
        <StatItem 
          label="Hourly Rate" 
          value={formatHourlyRate(stats.avgHourlyRate)}
          valueColor={stats.avgHourlyRate >= 0 ? COLORS.primary : COLORS.red}
        />
      </StatRow>
      
      <StatRow>
        <StatItem 
          label="Sessions Played" 
          value={stats.totalSessions}
        />
        <StatItem 
          label="Hours Played" 
          value={stats.totalHours.toFixed(1)}
        />
      </StatRow>
    </StatsCard>
  );
};

export default OverviewCard;