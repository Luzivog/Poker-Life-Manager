import { Session } from "@/config/types";

export interface MenuItemProps {
  title: string;
  itemType: keyof Session;
  topItem?: boolean;
  sessionData: Session;
  onValueChange: (key: keyof Session, value: any) => void;
}

export interface BaseMenuItemProps {
  title: string;
  itemType: keyof Session;
  sessionData: Session;
  onPress?: () => void;
  disabled?: boolean;
} 