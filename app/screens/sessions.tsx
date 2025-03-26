import React, { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "@/config/styles";
import AddSessionMenu from "../components/AddSessionMenu";
import SessionList from "../components/SessionList";
import { Ionicons } from "@expo/vector-icons";
import { useSessions } from "../hooks/useSessions";
import { useFocusEffect } from '@react-navigation/native';

export default function SessionsScreen() {
  const {
    sessions,
    loading,
    menuVisible,
    sessionData,
    openMenu,
    closeMenu,
    handleFinishMenu,
    handleValueChange,
    loadSessions
  } = useSessions();
  
  // Ref to track if we're currently processing a focus event
  const isFocusedRef = useRef(false);

  // Refresh sessions list when the screen comes into focus, but only once per focus
  useFocusEffect(
    React.useCallback(() => {
      // Only load sessions if this is a new focus event
      if (!isFocusedRef.current) {
        isFocusedRef.current = true;
        loadSessions(false);
      }
      
      return () => {
        // Reset the ref when the screen loses focus
        isFocusedRef.current = false;
      };
    }, [])  // Empty dependency array so it doesn't re-create on loadSessions changes
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Session History</Text>
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="add" style={globalStyles.rightIconButton}></Ionicons>
        </TouchableOpacity>
      </View>

      <SessionList sessions={sessions} loading={loading} />

      <AddSessionMenu
        visible={menuVisible}
        sessionData={sessionData}
        onCancel={closeMenu}
        onFinish={handleFinishMenu}
        onValueChange={handleValueChange}
      />
    </View>
  );
};
