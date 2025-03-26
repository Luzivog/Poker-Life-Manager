import React, { useState } from "react";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from "react-native";
import { useAuth } from "../Auth.native";
import { globalStyles } from "@/config/styles";
import { Ionicons } from "@expo/vector-icons";
import UserProfileModal from "../components/UserProfileModal";

export default function HomeScreen() {
  const { user, loading, signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Home</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="person-circle-outline" style={{...globalStyles.rightIconButton}}></Ionicons>
        </TouchableOpacity>
      </View>
      
      {loading || !user ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {/* Content of your home screen goes here */}
        </>
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
