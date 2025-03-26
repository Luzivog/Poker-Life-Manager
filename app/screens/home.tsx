import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
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
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { user, loading: userLoading, signOut } = useAuth();
  const { sessions, loading: sessionsLoading, loadSessions } = useSessions();
  const [modalVisible, setModalVisible] = useState(false);

  const isFocusedRef = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!isFocusedRef.current) {
        isFocusedRef.current = true;
        loadSessions(false); // Don't show loading state when refreshing from focus
      };
      
      return () => {
        isFocusedRef.current = false;
      };
    }, [])
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Calculate all statistics
  const stats = calculateStats(sessions);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Home</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="person-circle-outline" style={{ ...globalStyles.rightIconButton }}></Ionicons>
        </TouchableOpacity>
      </View>

      {userLoading || sessionsLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : !user ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Please log in</Text>
        </View>
      ) : (
        <ScrollView style={globalStyles.container}>
          {/* Overview Card */}
          <OverviewCard stats={stats} />

          {/* Performance Card */}
          <PerformanceCard stats={stats} />

          {/* Last Session Card - shows if sessions exist */}
          {sessions.length > 0 && (
            <LastSessionCard session={sessions[0]} />
          )}
        </ScrollView>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        visible={modalVisible}
        onClose={toggleModal}
        user={user}
        signOut={signOut}
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
  }
});
