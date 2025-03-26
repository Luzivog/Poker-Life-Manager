import React from "react";
import { 
  Modal, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  SafeAreaView,
  StyleProp,
  ViewStyle
} from "react-native";
import { globalStyles } from "@/config/styles";

interface SlideUpModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function SlideUpModal({ 
  visible, 
  onClose, 
  children,
  contentContainerStyle
}: SlideUpModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={globalStyles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
          style={[globalStyles.slideUpMenuContainer, contentContainerStyle]}
        >
          <SafeAreaView style={styles.contentContainer}>
            {children}
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  }
});