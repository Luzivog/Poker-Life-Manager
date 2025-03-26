import React from "react";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/config/variables";
import { globalStyles } from "@/config/styles";
import SlideUpModal from "./SlideUpModal";

interface UserProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user: any; // Type could be improved based on actual user object structure
  signOut: () => void;
}

export default function UserProfileModal({ 
  visible, 
  onClose, 
  user,
  signOut
}: UserProfileModalProps) {
  const handleLogout = () => {
    onClose();
    signOut();
  };

  return (
    <SlideUpModal visible={visible} onClose={onClose}>
      <View style={globalStyles.menuHeader}>
        <Text style={styles.modalTitle}>User Profile</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.modalContent}>
        {user && (
          <>
            <View style={styles.userInfoSection}>
              <Ionicons name="person-circle" size={80} color={COLORS.primary} style={styles.userIcon} />
              <Text style={styles.userEmail}>{user.email || 'No email provided'}</Text>
              <Text style={styles.userId}>User ID: {user.id}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Sign In:</Text>
                <Text style={styles.infoValue}>{new Date(user.last_sign_in_at || Date.now()).toLocaleString()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Created At:</Text>
                <Text style={styles.infoValue}>{new Date(user.created_at || Date.now()).toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SlideUpModal>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  userIcon: {
    marginBottom: 15,
  },
  userEmail: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userId: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  infoSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: 'white',
  },
  actionSection: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});