import { ContentColorProp, SizeProp } from "@/styles/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";

export type IconNameType =
  | "eye"
  | "eye-slash"
  | "plus"
  | "companies"
  | "edit"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "close"
  | "menu-down"
  | "menu-up"
  | "projects"
  | "gear"
  | "chart-bar-horizontal"
  | "home"
  | "user-circle"
  | "identification-card"
  | "blueprint"
  | "account"
  | "squares-four"
  | "tasks"
  | "remove"
  | "save"
  | "bold"
  | "italic"
  | "unordered-list"
  | "ordered-list"
  | "strikethrough"
  | "link"
  | "image"
  | "quote"
  | "underline"
  | "font-size"
  | "list"
  | "image"
  | "map-search"
  | "calendar"
  | "status"
  | "priority"
  | "document-upload"
  | "document"
  | "download"
  | "phases"
  | "milestones"
  | "warning";

export type IconMappingType = Record<
  IconNameType,
  ComponentProps<typeof MaterialIcons>["name"]
>;

export type IconProps = {
  name: IconNameType;
  color?: ContentColorProp;
  colorOverride?: string;
  size?: SizeProp;
  sizeOverride?: number;
};
