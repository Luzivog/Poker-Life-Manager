import React from 'react';
import { Text, StyleSheet } from 'react-native';
import InfoSection from './InfoSection';
import { Session } from '@/config/types';

interface NotesSectionProps {
  notes?: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  if (!notes) return null;
  
  return (
    <InfoSection title="Notes">
      <Text style={styles.notes}>{notes}</Text>
    </InfoSection>
  );
};

const styles = StyleSheet.create({
  notes: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
});

export default NotesSection;