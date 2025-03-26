import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "@/config/styles";
import { SESSION_DEFAULTS } from "@/config/variables";
import { Session } from "@/config/types";
import AddSessionMenu from "../components/AddSessionMenu";

export default function SessionsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sessionData, setSessionData] = useState<Session>({...SESSION_DEFAULTS});

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const finishMenu = () => {
    // Do something when finish is tapped
    setMenuVisible(false);
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
          <Text style={globalStyles.rightButton}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Session history content goes here */}

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
