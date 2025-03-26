import React from 'react';
import StatsCard, { StatRow, StatItem } from './StatsCard';
import { SessionStats, formatCurrency } from './utils';
import { COLORS } from '@/config/variables';

interface PerformanceCardProps {
  stats: SessionStats;
}

const PerformanceCard = ({ stats }: PerformanceCardProps) => {
  return (
    <StatsCard title="Performance">
      <StatRow>
        <StatItem 
          label="Win Rate" 
          value={`${stats.winRate.toFixed(1)}%`}
        />
        <StatItem 
          label="Avg Profit/Session" 
          value={formatCurrency(stats.avgProfit)}
          valueColor={stats.avgProfit >= 0 ? COLORS.primary : COLORS.red}
        />
      </StatRow>
      
      <StatRow>
        <StatItem 
          label="Biggest Win" 
          value={formatCurrency(stats.biggestWin)}
          valueColor={COLORS.primary}
        />
        <StatItem 
          label="Biggest Loss" 
          value={formatCurrency(stats.biggestLoss)}
          valueColor={COLORS.red}
        />
      </StatRow>
    </StatsCard>
  );
};

export default PerformanceCard;