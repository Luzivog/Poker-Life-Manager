import React, { useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "@/config/styles";
import AddSessionMenu from "../components/AddSessionMenu";
import SessionList from "../components/SessionList";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from 'expo-router';
import { useUserData } from "../UserDataContext";

export default function SessionsScreen() {
  const {
    sessions,
    loading,
    sessionData,
    refreshSessions,
    createSession,
    liveSessionMenuVisible,
    openLiveSessionMenu,
    closeLiveSessionMenu,
    handleValueChange,
    liveSessionData
  } = useUserData();
  
  // Ref to track if we're currently processing a focus event
  const isFocusedRef = useRef(false);

  // Refresh sessions list when the screen comes into focus, but only once per focus
  useFocusEffect(
    React.useCallback(() => {
      // Only load sessions if this is a new focus event
      if (!isFocusedRef.current) {
        isFocusedRef.current = true;
        refreshSessions(false);
      }
      
      return () => {
        // Reset the ref when the screen loses focus
        isFocusedRef.current = false;
      };
    }, [])  // Empty dependency array so it doesn't re-create on refreshSessions changes
  );

  // Handle finish menu action using the createSession from context
  const handleFinishMenu = async () => {
    await createSession(sessionData);
    closeLiveSessionMenu();
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Session History</Text>
        <TouchableOpacity onPress={openLiveSessionMenu}>
          <Ionicons name="add" style={globalStyles.rightIconButton}></Ionicons>
        </TouchableOpacity>
      </View>

      <SessionList sessions={sessions} loading={loading} />

      <AddSessionMenu
        visible={liveSessionMenuVisible}
        sessionData={sessionData}
        onCancel={closeLiveSessionMenu}
        onFinish={handleFinishMenu}
        onValueChange={handleValueChange}
      />
    </View>
  );
};
