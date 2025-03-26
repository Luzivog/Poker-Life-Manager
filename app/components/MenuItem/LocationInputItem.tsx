import { useCallback } from "react";
import { Alert, ActionSheetIOS } from "react-native";
import BaseMenuItem from "./BaseMenuItem";
import { MenuItemProps } from "./types";

export default function LocationInputItem({
  title,
  itemType,
  sessionData,
  onValueChange,
}: MenuItemProps) {
  const handlePress = useCallback(() => {
    // Replace this with the actual list of locations the user previously played at
    const previousLocations = ["Playground Poker Club", "Casino de Montreal", "Online"];
    const options = ["Enter New Location", ...previousLocations, "Cancel"];
    
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // "Enter New Location" was selected
          Alert.prompt(
            `Enter ${title}`,
            `Enter a location for ${title}`,
            (text) => {
              onValueChange(itemType, text);
            },
            "plain-text",
            "",
            "default"
          );
        } else if (buttonIndex !== options.length - 1) {
          // One of the previous locations was selected
          onValueChange(itemType, options[buttonIndex]);
        }
      }
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