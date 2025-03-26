import React, { useState, useCallback } from "react";
import BaseMenuItem from "./BaseMenuItem";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MenuItemProps } from "./types";

export default function DateTimeInputItem({
  title,
  itemType,
  sessionData,
  onValueChange,
}: MenuItemProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handlePress = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const handleConfirm = (date: Date) => {
    // Update the selected field with the new date
    onValueChange(itemType, date);
    
    // If this is the start time and it's after the current end time, update the end time as well
    if (itemType === "start_time" && 
        sessionData.end_time && 
        date > sessionData.end_time) {
      // Set the end time to the same as the new start time
      onValueChange("end_time", new Date(date));
    }
    
    setDatePickerVisibility(false);
  };

  const handleCancel = () => {
    setDatePickerVisibility(false);
  };

  // Get the minimum date for the end_time field
  const getMinimumDate = () => {
    if (itemType === "end_time") {
      return sessionData.start_time;
    }
    return undefined;
  };

  return (
    <>
      <BaseMenuItem
        title={title}
        itemType={itemType}
        sessionData={sessionData}
        onPress={handlePress}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display="spinner"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        minimumDate={getMinimumDate()}
      />
    </>
  );
} 