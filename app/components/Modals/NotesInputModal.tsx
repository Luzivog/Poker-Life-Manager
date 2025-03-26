import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from "react-native";
import { globalStyles } from "@/config/styles";
import SlideUpModal from "../SlideUpModal";

interface NotesInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialValue: string;
  title: string;
}

export default function NotesInputModal({
  visible,
  onClose,
  onSave,
  initialValue,
  title
}: NotesInputModalProps) {
  const [inputText, setInputText] = useState(initialValue || '');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Reset input text when modal opens with new initialValue
  useEffect(() => {
    if (visible) {
      setInputText(initialValue || '');
    }
  }, [visible, initialValue]);

  // Handle keyboard events to adjust modal position
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleSave = () => {
    onSave(inputText);
    onClose();
  };

  return (
    <SlideUpModal 
      visible={visible} 
      onClose={onClose}
      contentContainerStyle={[
        styles.modalContainer,
        { marginBottom: keyboardHeight }
      ]}
    >
      <View style={globalStyles.menuHeader}>
        <TouchableOpacity onPress={onClose}>
          <Text style={globalStyles.leftTextButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={globalStyles.rightTextButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.inputContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.textInput}
          multiline
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter your notes here..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoFocus
        />
      </KeyboardAvoidingView>
    </SlideUpModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "40%", // Shorter than default modal
    position: 'relative', // Ensures it stays above keyboard
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  inputContainer: {
    flex: 1,
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#222222",
  }
});