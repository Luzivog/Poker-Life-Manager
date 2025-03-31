import React, { useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { useAuth } from "../Auth.native";
import { globalStyles } from "@/config/styles";
import UserProfileModal from "../components/Modals/UserProfileModal";
import { calculateStats } from "../components/HomeScreen/utils";
import OverviewCard from "../components/HomeScreen/OverviewCard";
import PerformanceCard from "../components/HomeScreen/PerformanceCard";
import LastSessionCard from "../components/HomeScreen/LastSessionCard";
import { useFocusEffect } from "expo-router";
import LiveSessionMenu from "../components/LiveSessionMenu";
import LoadingView from "../components/HomeScreen/LoadingView";
import SessionButton from "../components/HomeScreen/SessionButton";
import HeaderSection from "../components/HomeScreen/HeaderSection";
import { useUserData } from "../UserDataContext";

export default function HomeScreen() {
  const { user, loading: userLoading, signOut } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const isFocusedRef = useRef(false);
  
  // Use the UserDataContext for all session management
  const {
    sessions,
    loading: sessionsLoading,
    refreshSessions,
    sessionData,
    liveSessionData,
    liveSessionMenuVisible,
    openLiveSessionMenu,
    closeLiveSessionMenu,
    handleValueChange,
    startLiveSession,
    navigateToLiveSession
  } = useUserData();

  // Load sessions when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (!isFocusedRef.current) {
        isFocusedRef.current = true;
        refreshSessions(false); // Don't show loading state when refreshing from focus
      };
      
      return () => {
        isFocusedRef.current = false;
      };
    }, [user])
  );

  const toggleUserModal = () => {
    setModalVisible(!modalVisible);
  };

  const completedSessions = useMemo(() => {
    return sessions.filter(session => session.status === 'completed');
  }, [sessions]);

  const stats = calculateStats(completedSessions);
  const isLoading = userLoading || sessionsLoading;

  return (
    <View style={globalStyles.container}>
      <HeaderSection title="Home" onProfilePress={toggleUserModal} />
      {isLoading ? (
        <LoadingView />
      ) : !user ? (
        <LoadingView message="Please log in" />
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView 
            style={globalStyles.container} 
            contentContainerStyle={{paddingBottom: liveSessionData ? 80 : 60}}
            showsVerticalScrollIndicator={false}
          >
            {/* Overview Card */}
            <OverviewCard stats={stats} />
            {/* Performance Card */}
            <PerformanceCard stats={stats} />
            {/* Last Session Card - shows if sessions exist */}
            {completedSessions.length > 0 && (
              <LastSessionCard session={completedSessions[0]} />
            )}
          </ScrollView>
          
          {/* Session Button Component */}
          <SessionButton 
            existingLiveSession={liveSessionData}
            onStartNewSession={openLiveSessionMenu}
            onNavigateToLiveSession={navigateToLiveSession}
          />
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
  contentContainer: {
    flex: 1,
    position: 'relative'
  }
});
