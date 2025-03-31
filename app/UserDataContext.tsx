import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { Session, SessionWithId, SESSION_STATUS, LiveSessionWithId, CompletedSessionWithId, LiveSession } from '@/config/types';
import { fetchSessions, saveSession, updateSession, endLiveSession } from './services/sessionService';
import { useAuth } from './Auth.native';
import { SESSION_DEFAULTS, LIVE_SESSION_DEFAULTS } from '@/config/variables';
import { useRouter } from 'expo-router';

// Define the context type
type UserDataContextType = {
  // Session management
  sessions: SessionWithId[];
  loading: boolean;
  refreshSessions: (showLoading?: boolean) => Promise<void>;
  createSession: (sessionData: Session) => Promise<SessionWithId | null>;
  updateSessionById: (sessionId: string, sessionData: Session) => Promise<SessionWithId | null>;
  endSession: (sessionId: string, cashOut: number) => Promise<SessionWithId | null>;
  
  // Live session management
  sessionData: Session;
  liveSessionData: LiveSessionWithId | null;
  liveSessionMenuVisible: boolean;
  openLiveSessionMenu: () => void;
  closeLiveSessionMenu: () => void;
  handleValueChange: (key: keyof Session, value: any) => void;
  startLiveSession: () => Promise<void>;
  navigateToLiveSession: () => void;
};

// Create the context with default values
const UserDataContext = createContext<UserDataContextType>({
  // Session management defaults
  sessions: [],
  loading: false,
  refreshSessions: async () => {},
  createSession: async () => null,
  updateSessionById: async () => null,
  endSession: async () => null,
  
  // Live session management defaults
  sessionData: LIVE_SESSION_DEFAULTS,
  liveSessionData: null,
  liveSessionMenuVisible: false,
  openLiveSessionMenu: () => {},
  closeLiveSessionMenu: () => {},
  handleValueChange: () => {},
  startLiveSession: async () => {},
  navigateToLiveSession: () => {},
});

// Create the provider component
export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  
  // Session management state
  const [sessions, setSessions] = useState<SessionWithId[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Live session management state
  const [sessionData, setSessionData] = useState<Session>({...LIVE_SESSION_DEFAULTS});
  const [liveSessionMenuVisible, setLiveSessionMenuVisible] = useState(false);

  // Find live session from sessions array
  const liveSession = useMemo(() => {
    return sessions.find(session => session.status === 'live') as LiveSessionWithId | null;
  }, [sessions]);

  // Load sessions when the user changes
  useEffect(() => {
    if (user) {
      refreshSessions();
    }
  }, [user]);

  // Function to refresh the sessions list
  const refreshSessions = async (showLoading: boolean = true) => {
    if (!user) return;
    
    try {
      if (showLoading) {
        setLoading(true);
      }
      
      const { sessions: fetchedSessions, error } = await fetchSessions();
      
      if (error) {
        Alert.alert('Error', 'Failed to load sessions');
      } else {
        setSessions(fetchedSessions);
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Function to create a new session
  const createSession = async (sessionData: Session): Promise<SessionWithId | null> => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a session');
      return null;
    }

    try {
      setLoading(true);
      
      const { session: newSession, error } = await saveSession(sessionData, user.id);
      
      if (error) {
        Alert.alert('Error', 'Failed to save session');
        return null;
      } else {
        // Refresh sessions list
        await refreshSessions(false);
        return newSession;
      }
    } catch (error) {
      console.error('Exception in createSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to update an existing session
  const updateSessionById = async (sessionId: string, sessionData: Session): Promise<SessionWithId | null> => {
    try {
      setLoading(true);
      
      const { session: updatedSession, error } = await updateSession(sessionData, sessionId);
      
      if (error) {
        Alert.alert('Error', 'Failed to update session');
        return null;
      } else {
        // Refresh sessions list
        await refreshSessions(false);
        return updatedSession;
      }
    } catch (error) {
      console.error('Exception in updateSessionById:', error);
      Alert.alert('Error', 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to end a live session
  const endSession = async (sessionId: string, cashOut: number): Promise<CompletedSessionWithId | null> => {
    try {
      setLoading(true);
      
      const { session: updatedSession, error } = await endLiveSession(sessionId, cashOut);
      
      if (error) {
        Alert.alert('Error', 'Failed to end session');
        return null;
      } else {
        // Refresh sessions list
        await refreshSessions(false);
        return updatedSession as CompletedSessionWithId;
      }
    } catch (error) {
      console.error('Exception in endSession:', error);
      Alert.alert('Error', 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Live session management functions
  const openLiveSessionMenu = () => {
    // Reset session data to defaults
    setSessionData({...LIVE_SESSION_DEFAULTS});
    setLiveSessionMenuVisible(true);
  };

  const closeLiveSessionMenu = () => {
    setLiveSessionMenuVisible(false);
  };

  const handleValueChange = (key: keyof Session, value: any) => {
    setSessionData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startLiveSession = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to start a live session");
      return;
    }
    
    try {
      // Check if user already has a live session
      if (liveSession) {
        Alert.alert(
          "Live Session In Progress",
          "You already have an active live session. Please end it before starting a new one.",
          [{ text: "OK" }]
        );
        return;
      }
      
      // Make sure status and start_time are set
      const liveSessionData: LiveSession = {
        ...sessionData,
        status: "live",
        start_time: new Date(),
        end_time: undefined,
        cash_out: undefined
      };
      
      const { session, error: saveError } = await saveSession(liveSessionData, user.id);
      
      if (saveError) {
        Alert.alert("Error", "Failed to start live session");
        return;
      }
      
      Alert.alert("Success", "Live session started successfully");
      setLiveSessionMenuVisible(false);
      
      // Refresh sessions
      await refreshSessions(false);
      
      // Navigate to the live session details screen
      if (session) {
        router.push({
          pathname: '/liveSessionDetails',
          params: { session: JSON.stringify(session) }
        });
      }
    } catch (error) {
      console.error("Error starting live session:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const navigateToLiveSession = () => {
    if (liveSession) {
      router.push({
        pathname: '/liveSessionDetails',
        params: { session: JSON.stringify(liveSession) }
      });
    }
  };

  // Return the provider with the context value
  return (
    <UserDataContext.Provider
      value={{
        // Session management
        sessions,
        loading,
        refreshSessions,
        createSession,
        updateSessionById,
        endSession,
        
        // Live session management
        sessionData,
        liveSessionData: liveSession,
        liveSessionMenuVisible,
        openLiveSessionMenu,
        closeLiveSessionMenu,
        handleValueChange,
        startLiveSession,
        navigateToLiveSession,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

// Create a hook to use the user data context
export function useUserData() {
  return useContext(UserDataContext);
}