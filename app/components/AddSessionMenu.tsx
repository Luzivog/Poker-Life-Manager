import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { globalStyles } from "@/config/styles";
import { Session } from "@/config/types";
import MenuItem from "./menuItem";

interface AddSessionMenuProps {
  visible: boolean;
  sessionData: Session;
  onCancel: () => void;
  onFinish: () => void;
  onValueChange: (key: keyof Session, value: any) => void;
}

export default function AddSessionMenu({ 
  visible, 
  sessionData, 
  onCancel, 
  onFinish, 
  onValueChange 
}: AddSessionMenuProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.slideUpMenuContainer}>
          <View style={globalStyles.menuHeader}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={globalStyles.leftButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFinish}>
              <Text style={globalStyles.rightButton}>Finish</Text>
            </TouchableOpacity>
          </View>
          <MenuItem 
            title="Game" 
            itemType="game_type" 
            topItem={true} 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Small blind" 
            itemType="small_blind" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Big blind" 
            itemType="big_blind" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Buy-in" 
            itemType="buy_in" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Cash out" 
            itemType="cash_out" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Table size" 
            itemType="table_size" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Location" 
            itemType="location" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="Start" 
            itemType="start_time" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
          <MenuItem 
            title="End" 
            itemType="end_time" 
            sessionData={sessionData} 
            onValueChange={onValueChange} 
          />
        </View>
      </View>
    </Modal>
  );
} 