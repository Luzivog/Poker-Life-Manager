import { useCallback, useState } from "react";
import BaseMenuItem from "./BaseMenuItem";
import { MenuItemProps } from "./types";
import NotesInputModal from "../Modals/NotesInputModal";

export default function TextInputItem({
  title,
  itemType,
  sessionData,
  onValueChange,
}: MenuItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const handlePress = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleSave = useCallback((text: string) => {
    onValueChange(itemType, text);
  }, [itemType, onValueChange]);

  return (
    <>
      <BaseMenuItem
        title={title}
        itemType={itemType}
        sessionData={sessionData}
        onPress={handlePress}
      />
      <NotesInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={sessionData[itemType]?.toString() || ""}
        title={title}
      />
    </>
  );
}