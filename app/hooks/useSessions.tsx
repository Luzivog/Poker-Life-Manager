import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Session } from "@/config/types";
import { SESSION_DEFAULTS } from "@/config/variables";
import { fetchSessions, saveSession, SessionWithId } from "../services/sessionService";
import { useAuth } from "../Auth.native";

export const useSessions = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sessionData, setSessionData] = useState<Session>({...SESSION_DEFAULTS});
  const [sessions, setSessions] = useState<SessionWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch sessions when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const { sessions: fetchedSessions, error } = await fetchSessions();
      
      if (error) {
        Alert.alert('Error', 'Failed to load sessions');
      } else {
        setSessions(fetchedSessions);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (key: keyof Session, value: any) => {
    setSessionData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const openMenu = () => setMenuVisible(true);
  
  const closeMenu = () => setMenuVisible(false);
  
  const handleFinishMenu = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a session');
      setMenuVisible(false);
      return;
    }

    try {
      setLoading(true);
      
      const { session: newSession, error } = await saveSession(sessionData, user.id);
      
      if (error) {
        Alert.alert('Error', 'Failed to save session');
      } else {
        // Reset session data to defaults
        setSessionData({...SESSION_DEFAULTS});
        // Refresh sessions list
        loadSessions();
      }
    } catch (error) {
      console.error('Exception in handleFinishMenu:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
      setMenuVisible(false);
    }
  };

  return {
    sessions,
    loading,
    menuVisible,
    sessionData,
    openMenu,
    closeMenu,
    handleFinishMenu,
    handleValueChange,
    loadSessions
  };
};