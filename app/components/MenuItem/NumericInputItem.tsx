import { useCallback } from "react";
import { Alert } from "react-native";
import BaseMenuItem from "./BaseMenuItem";
import { MenuItemProps } from "./types";

export default function NumericInputItem({
  title,
  itemType,
  sessionData,
  onValueChange,
}: MenuItemProps) {
  const handlePress = useCallback(() => {
    Alert.prompt(
      `Enter ${title}`,
      `Enter the amount of the ${title.toLowerCase()}`,
      (text) => {
        const numericValue = parseFloat(text);
        if (!isNaN(numericValue)) {
          onValueChange(itemType, numericValue);
        }
      },
      "plain-text",
      "",
      "numeric"
    );
  }, [title, itemType, onValueChange]);

  return (
    <BaseMenuItem
      title={title}
      itemType={itemType}
      sessionData={sessionData}
      onPress={handlePress}
    />
  );
} 