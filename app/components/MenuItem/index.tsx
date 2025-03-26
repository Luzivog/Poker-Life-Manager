import { View } from "react-native";
import NumericInputItem from "./NumericInputItem";
import LocationInputItem from "./LocationInputItem";
import OptionsInputItem from "./OptionsInputItem";
import DateTimeInputItem from "./DateTimeInputItem";
import TextInputItem from "./TextInputItem";
import BaseMenuItem from "./BaseMenuItem";
import { MenuItemProps } from "./types";

export default function MenuItem(props: MenuItemProps) {
  const { itemType, title, sessionData, onValueChange, topItem } = props;
  
  // Determine which type of input component to render based on itemType
  const renderInputComponent = () => {
    if (itemType === "stack_size_updates") {
      // This type is handled separately as mentioned in the original code
      return <BaseMenuItem {...props} disabled />;
    }
    
    if (["small_blind", "big_blind", "buy_in", "cash_out"].includes(itemType)) {
      return <NumericInputItem {...props} />;
    }
    
    if (itemType === "location") {
      return <LocationInputItem {...props} />;
    }
    
    if (["start_time", "end_time"].includes(itemType)) {
      return <DateTimeInputItem {...props} />;
    }
    
    if (["game_type", "table_size"].includes(itemType)) {
      return <OptionsInputItem {...props} />;
    }
    
    if (itemType === "notes") {
      return <TextInputItem {...props} />;
    }
    
    // Default fallback to base component
    return <BaseMenuItem {...props} />;
  };

  return (
    <View
      style={{
        borderColor: "grey",
        borderTopWidth: topItem ? 1 : 0,
        borderBottomWidth: 1,
      }}
    >
      {renderInputComponent()}
    </View>
  );
}