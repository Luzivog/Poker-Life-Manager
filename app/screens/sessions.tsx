import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "@/config/styles";
import { COLORS, SESSION_DEFAULTS } from "@/config/variables";
import { Session } from "@/config/types";
import AddSessionMenu from "../components/AddSessionMenu";
import SessionList from "../components/SessionList";
import { supabase } from "../Auth.native";
import { useAuth } from "../Auth.native";
import { Ionicons } from "@expo/vector-icons";

export default function SessionsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sessionData, setSessionData] = useState<Session>({...SESSION_DEFAULTS});
  const [sessions, setSessions] = useState<(Session & { id: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch sessions when component mounts
  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('start_time', { ascending: false });
      
      if (error) {
        console.error('Error fetching sessions:', error);
        Alert.alert('Error', 'Failed to load sessions');
      } else {
        setSessions(data || []);
      }
    } catch (error) {
      console.error('Exception fetching sessions:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const finishMenu = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a session');
      setMenuVisible(false);
      return;
    }

    try {
      setLoading(true);
      
      // Insert the session into Supabase
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          game_type: sessionData.game_type,
          small_blind: sessionData.small_blind,
          big_blind: sessionData.big_blind,
          buy_in: sessionData.buy_in,
          cash_out: sessionData.cash_out,
          table_size: sessionData.table_size,
          location: sessionData.location,
          start_time: sessionData.start_time.toISOString(),
          end_time: sessionData.end_time.toISOString(),
          stack_size_updates: sessionData.stack_size_updates || []
        })
        .select();
      
      if (error) {
        console.error('Error saving session:', error);
        Alert.alert('Error', 'Failed to save session');
      } else {
        // Reset session data to defaults
        setSessionData({...SESSION_DEFAULTS});
        // Refresh sessions list
        fetchSessions();
      }
    } catch (error) {
      console.error('Exception saving session:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
      setMenuVisible(false);
    }
  };

  const handleValueChange = (key: keyof Session, value: any) => {
    setSessionData(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
        onFinish={finishMenu}
        onValueChange={handleValueChange}
      />
    </View>
  );
};
