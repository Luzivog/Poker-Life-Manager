import { useCallback } from "react";
import { ActionSheetIOS } from "react-native";
import BaseMenuItem from "./BaseMenuItem";
import { MenuItemProps } from "./types";
import { GAME_TYPES, TABLE_SIZES } from "@/config/types";
export default function OptionsInputItem({
  title,
  itemType,
  sessionData,
  onValueChange,
}: MenuItemProps) {
  const handlePress = useCallback(() => {
    let options: string[] = [];

    switch (itemType) {
      case "game_type":
        options = [...GAME_TYPES];
        break;
      case "table_size":
        options = [...TABLE_SIZES];
        break;
      default:
        options = [];
    }

    // Append a Cancel option at the end
    options.push("Cancel");

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length - 1) {
          onValueChange(itemType, options[buttonIndex]);
        }
      }
    );
  }, [itemType, onValueChange]);

  return (
    <BaseMenuItem
      title={title}
      itemType={itemType}
      sessionData={sessionData}
      onPress={handlePress}
    />
  );
} 