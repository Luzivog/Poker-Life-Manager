import React from 'react';
import InfoSection, { InfoRow } from './InfoSection';
import { formatDate, calculateDurationString } from './utils';
import { Session } from '@/config/types';

interface SessionInfoSectionProps {
    sessionData: Session & { id: string };
}

const SessionInfoSection: React.FC<SessionInfoSectionProps> = ({ sessionData }) => {

    const end_time = sessionData.end_time ? sessionData.end_time : new Date();

    return (
        <InfoSection title="Session Info">
            <InfoRow label="Start Time:" value={formatDate(sessionData.start_time)} />
            {sessionData.end_time && <InfoRow label="End Time:" value={formatDate(sessionData.end_time)} />}
            <InfoRow label="Duration:" value={calculateDurationString(sessionData.start_time, end_time)} />
        </InfoSection>
    );
};

export default SessionInfoSection;