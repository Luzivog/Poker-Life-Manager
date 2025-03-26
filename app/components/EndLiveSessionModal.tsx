import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert
} from "react-native";
import SlideUpModal from "./SlideUpModal";
import { globalStyles } from "@/config/styles";
import { COLORS } from "@/config/variables";
import { SessionWithId } from "../services/sessionService";
import NumericInputItem from "./MenuItem/NumericInputItem";

interface EndLiveSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onEndSession: (cashOut: number) => void;
  session: SessionWithId;
}

export default function EndLiveSessionModal({
  visible,
  onClose,
  onEndSession,
  session
}: EndLiveSessionModalProps) {
  const [cashOut, setCashOut] = useState(0);

  const handleNumericInputChange = (_: any, value: number) => {
    setCashOut(value);
  };
  
  const handleEndSession = () => {
    if (cashOut < 0) {
      Alert.alert("Invalid Amount", "Cash out amount cannot be negative");
      return;
    }
    
    onEndSession(cashOut);
  };

  return (
    <SlideUpModal visible={visible} onClose={onClose}>
      <View style={globalStyles.menuHeader}>
        <TouchableOpacity onPress={onClose}>
          <Text style={globalStyles.leftTextButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>End Live Session</Text>
        <TouchableOpacity onPress={handleEndSession}>
          <Text style={globalStyles.rightTextButton}>End</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.sessionInfo}>
          <Text style={styles.infoLabel}>
            Game: <Text style={styles.infoValue}>{session.game_type} {session.small_blind}/{session.big_blind}</Text>
          </Text>
          <Text style={styles.infoLabel}>
            Buy-in: <Text style={styles.infoValue}>{session.buy_in}$</Text>
          </Text>
          <Text style={[styles.infoLabel, { marginBottom: 0 }]}>
            Location: <Text style={styles.infoValue}>{session.location}</Text>
          </Text>
        </View>

        <View style={styles.cashOutContainer}>
          <Text style={styles.cashOutLabel}>How much did you cash out?</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.inputButton} 
              onPress={() => setCashOut(Math.max(0, cashOut - 10))}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cashOutValue}>{cashOut}$</Text>
            <TouchableOpacity 
              style={styles.inputButton} 
              onPress={() => setCashOut(cashOut + 10)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              Alert.prompt(
                "Enter Cash Out",
                "Enter the amount you cashed out",
                (text) => {
                  const numValue = parseFloat(text);
                  if (!isNaN(numValue)) {
                    setCashOut(numValue);
                  }
                },
                "plain-text",
                "",
                "numeric"
              );
            }}
          >
            <Text style={styles.editButtonText}>Enter exact amount</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Result:</Text>
          <Text style={[styles.resultValue, { color: cashOut - session.buy_in >= 0 ? COLORS.primary : COLORS.red }]}>
            {cashOut - session.buy_in >= 0 ? '+' : ''}{cashOut - session.buy_in}$
          </Text>
        </View>
      </View>
    </SlideUpModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 20,
  },
  sessionInfo: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
  },
  infoValue: {
    color: 'white',
    fontWeight: '500',
  },
  cashOutContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  cashOutLabel: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  inputButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  cashOutValue: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 20,
    minWidth: 80,
    textAlign: "center",
  },
  editButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  resultLabel: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  resultValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
});