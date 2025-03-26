import { Session } from "@/config/types";
import { COLORS } from "@/config/variables";
import { TouchableOpacity, Text } from "react-native";
import { BaseMenuItemProps } from "./types";

export default function BaseMenuItem({
  title,
  itemType,
  sessionData,
  onPress,
  disabled = false,
}: BaseMenuItemProps) {
  const itemValue = sessionData[itemType];
  
  const displayValue = () => {
    if (itemValue === undefined) return "";
    
    let valueStr = "";
    if (itemValue instanceof Date) {
      valueStr = itemValue.toLocaleString();
    } else {
      valueStr = itemValue.toString();
    };
    
    // If a newline appears within the first 35 characters, cut the string there.
    const newlineIndex = valueStr.indexOf("\n");
    if (newlineIndex !== -1 && newlineIndex < 35) {
      return valueStr.substring(0, newlineIndex) + "...";
    }
    
    // Otherwise, truncate strings longer than 35 characters.
    return valueStr.length > 35 ? valueStr.substring(0, 32) + "..." : valueStr;
  };
  
  
  const isNumeric = typeof itemValue === "number";
  
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ color: "white", fontSize: 16, paddingLeft: 10 }}>{title}</Text>
      <Text style={{ color: COLORS.secondary, fontSize: 16, paddingRight: 10 }}>
        {displayValue()}
        {isNumeric ? "$" : ""}
      </Text>
    </TouchableOpacity>
  );
}