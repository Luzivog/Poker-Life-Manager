import React from 'react';
import InfoSection, { InfoRow } from './InfoSection';
import { Session } from '@/config/types';

interface GameInfoSectionProps {
  sessionData: Session & { id: string };
}

const GameInfoSection: React.FC<GameInfoSectionProps> = ({ sessionData }) => {
  return (
    <InfoSection title="Game Info">
      <InfoRow label="Location:" value={sessionData.location} />
      <InfoRow label="Stakes:" value={`${sessionData.small_blind}/${sessionData.big_blind}`} />
      <InfoRow label="Table Size:" value={sessionData.table_size} />
    </InfoSection>
  );
};

export default GameInfoSection;