import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "@/config/styles";
import { Session } from "@/config/types";
import MenuItem from "./menuItem";
import SlideUpModal from "./SlideUpModal";

interface LiveSessionMenuProps {
  visible: boolean;
  sessionData: Session;
  onCancel: () => void;
  onFinish: () => void;
  onValueChange: (key: keyof Session, value: any) => void;
}

export default function LiveSessionMenu({ 
  visible, 
  sessionData, 
  onCancel, 
  onFinish, 
  onValueChange 
}: LiveSessionMenuProps) {
  return (
    <SlideUpModal visible={visible} onClose={onCancel}>
      <View style={globalStyles.menuHeader}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={globalStyles.leftTextButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Live Session</Text>
        <TouchableOpacity onPress={onFinish}>
          <Text style={globalStyles.rightTextButton}>Start</Text>
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
        title="Notes" 
        itemType="notes" 
        sessionData={sessionData} 
        onValueChange={onValueChange} 
      />
    </SlideUpModal>
  );
}