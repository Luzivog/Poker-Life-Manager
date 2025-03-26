import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { useAuth } from "../Auth.native";
import { globalStyles } from "@/config/styles";
import { Ionicons } from "@expo/vector-icons";
import UserProfileModal from "../components/Modals/UserProfileModal";
import { useSessions } from "../hooks/useSessions";
import { calculateStats } from "../components/HomeScreen/utils";
import OverviewCard from "../components/HomeScreen/OverviewCard";
import PerformanceCard from "../components/HomeScreen/PerformanceCard";
import LastSessionCard from "../components/HomeScreen/LastSessionCard";
import { useFocusEffect, useRouter } from "expo-router";
import { COLORS } from "@/config/variables";
import { LIVE_SESSION_DEFAULTS } from "@/config/variables";
import LiveSessionMenu from "../components/LiveSessionMenu";
import { hasLiveSession, saveSession, SessionWithId } from "../services/sessionService";
import { SESSION_STATUS } from "@/config/types";

export default function HomeScreen() {
  const { user, loading: userLoading, signOut } = useAuth();
  const { sessions, loading: sessionsLoading, loadSessions } = useSessions();
  const [modalVisible, setModalVisible] = useState(false);
  const [liveSessionMenuVisible, setLiveSessionMenuVisible] = useState(false);
  const [sessionData, setSessionData] = useState({...LIVE_SESSION_DEFAULTS});
  const [existingLiveSession, setExistingLiveSession] = useState<SessionWithId | null>(null);
  const [isCheckingLiveSession, setIsCheckingLiveSession] = useState(false);
  const router = useRouter();

  const isFocusedRef = useRef(false);

  // Check if user has an existing live session
  const checkExistingLiveSession = async () => {
    if (!user) return;
    
    setIsCheckingLiveSession(true);
    try {
      const { exists, session, error } = await hasLiveSession(user.id);
      if (error) {
        console.error("Error checking for live sessions:", error);
        return;
      }
      
      if (exists && session) {
        setExistingLiveSession(session);
      } else {
        setExistingLiveSession(null);
      }
    } finally {
      setIsCheckingLiveSession(false);
    }
  };

  // Load sessions and check for live session when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (!isFocusedRef.current) {
        isFocusedRef.current = true;
        loadSessions(false); // Don't show loading state when refreshing from focus
        checkExistingLiveSession();
      };
      
      return () => {
        isFocusedRef.current = false;
      };
    }, [user])
  );

  // When user changes, check for live session
  useEffect(() => {
    if (user) {
      checkExistingLiveSession();
    }
  }, [user]);

  const toggleUserModal = () => {
    setModalVisible(!modalVisible);
  };

  const openLiveSessionMenu = () => {
    // Reset session data to defaults
    setSessionData({...LIVE_SESSION_DEFAULTS});
    setLiveSessionMenuVisible(true);
  };

  const closeLiveSessionMenu = () => {
    setLiveSessionMenuVisible(false);
  };

  const handleValueChange = (key: keyof typeof sessionData, value: any) => {
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
      // Check again if user already has a live session
      const { exists, error } = await hasLiveSession(user.id);
      if (error) {
        Alert.alert("Error", "Failed to check for existing live sessions");
        return;
      }
      
      if (exists) {
        Alert.alert(
          "Live Session In Progress",
          "You already have an active live session. Please end it before starting a new one.",
          [{ text: "OK" }]
        );
        return;
      }
      
      // Make sure status and start_time are set
      const liveSessionData = {
        ...sessionData,
        status: "live" as typeof SESSION_STATUS[number],
        start_time: new Date()
      };
      
      const { session, error: saveError } = await saveSession(liveSessionData, user.id);
      if (saveError) {
        Alert.alert("Error", "Failed to start live session");
        return;
      }
      
      Alert.alert("Success", "Live session started successfully");
      setLiveSessionMenuVisible(false);
      
      // Refresh sessions and check for live session
      loadSessions();
      checkExistingLiveSession();
      
      // Navigate to the session details screen
      if (session) {
        router.push({
          pathname: '/sessionDetails',
          params: { session: JSON.stringify(session) }
        });
      }
      
    } catch (error) {
      console.error("Error starting live session:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const navigateToLiveSession = () => {
    if (existingLiveSession) {
      router.push({
        pathname: '/sessionDetails',
        params: { session: JSON.stringify(existingLiveSession) }
      });
    }
  };

  // Calculate all statistics
  const stats = calculateStats(sessions);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Home</Text>
        <TouchableOpacity onPress={toggleUserModal}>
          <Ionicons name="person-circle-outline" style={{ ...globalStyles.rightIconButton }}></Ionicons>
        </TouchableOpacity>
      </View>

      {userLoading || sessionsLoading || isCheckingLiveSession ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : !user ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Please log in</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView 
            style={globalStyles.container} 
            contentContainerStyle={{paddingBottom: existingLiveSession ? 80 : 60}}
            showsVerticalScrollIndicator={false}
          >
            {/* Overview Card */}
            <OverviewCard stats={stats} />

            {/* Performance Card */}
            <PerformanceCard stats={stats} />

            {/* Last Session Card - shows if sessions exist */}
            {sessions.length > 0 && (
              <LastSessionCard session={sessions[0]} />
            )}
          </ScrollView>
          
          {/* Live Session Button or Ongoing Session Button */}
          {existingLiveSession ? (
            <TouchableOpacity 
              style={[globalStyles.liveSessionButton, styles.ongoingSessionButton]} 
              onPress={navigateToLiveSession}
            >
              <View style={styles.liveIndicator} />
              <Text style={styles.liveSessionButtonText}>Ongoing Live Session</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={globalStyles.liveSessionButton} 
              onPress={openLiveSessionMenu}
            >
              <Ionicons name="play" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.liveSessionButtonText}>Start a live session</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        visible={modalVisible}
        onClose={toggleUserModal}
        user={user}
        signOut={signOut}
      />

      {/* Live Session Menu */}
      <LiveSessionMenu
        visible={liveSessionMenuVisible}
        sessionData={sessionData}
        onCancel={closeLiveSessionMenu}
        onFinish={startLiveSession}
        onValueChange={handleValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    position: 'relative'
  },
  ongoingSessionButton: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonIcon: {
    marginRight: 10
  },
  liveSessionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  }
});
