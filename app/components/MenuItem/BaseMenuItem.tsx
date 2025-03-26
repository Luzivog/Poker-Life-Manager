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
    if (itemValue instanceof Date) return itemValue.toLocaleString();
    return itemValue.toString();
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