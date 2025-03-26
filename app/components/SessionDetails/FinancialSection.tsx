import React from 'react';
import InfoSection, { InfoRow } from './InfoSection';
import { calculateDurationMs } from './utils';
import { Session } from '@/config/types';
import { COLORS } from '@/config/variables';

interface FinancialSectionProps {
  sessionData: Session & { id: string };
}

const FinancialSection: React.FC<FinancialSectionProps> = ({ sessionData }) => {
  // Calculate profit
  const profit = sessionData.cash_out - sessionData.buy_in;
  const profitColor = profit >= 0 ? COLORS.primary : COLORS.red;
  
  // Calculate hourly rate
  const hourlyRate = (profit / (calculateDurationMs(sessionData.start_time, sessionData.end_time) / 3600000)).toFixed(2);

  return (
    <InfoSection title="Financial">
      <InfoRow label="Buy-in:" value={`${sessionData.buy_in}$`} />
      <InfoRow label="Cash Out:" value={`${sessionData.cash_out}$`} />
      <InfoRow 
        label="Profit/Loss:" 
        value={`${profit >= 0 ? '+' : ''}${profit}$`} 
        valueColor={profitColor}
      />
      <InfoRow 
        label="Hourly:" 
        value={`${profit >= 0 ? '+' : ''}${hourlyRate}$/h`}              
        valueColor={profitColor}
      />
    </InfoSection>
  );
};

export default FinancialSection;