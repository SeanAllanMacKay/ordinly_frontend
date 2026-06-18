import React, {
  Children,
  createContext,
  isValidElement,
  useMemo,
  useState,
} from "react";
import { View } from "react-native";
import { accordionStyles } from "./styles";
import { AccordionProps } from "./types";
import { AccordionItem } from "./AccordionItem";

export const AccordionContext = createContext<{
  openSections: string[];
  onToggleOpen: (key: string) => void;
}>({ openSections: [], onToggleOpen: () => {} });

export const Accordion = ({
  children,
  defaultOpenSections,
}: AccordionProps) => {
  const [openSections, setOpenSections] = useState(defaultOpenSections ?? []);

  const value = useMemo(
    () => ({
      openSections,
      onToggleOpen: (key: string) =>
        setOpenSections((prev) =>
          prev?.includes(key)
            ? prev.filter((k) => k !== key)
            : [...(prev ?? []), key],
        ),
    }),
    [openSections],
  );

  const validChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === AccordionItem,
  );

  return (
    <AccordionContext.Provider value={value}>
      <View style={accordionStyles.container}>
        {validChildren.map((child, index) => {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            isFirst: index === 0,
            isLast: index === validChildren.length - 1,
          });
        })}
      </View>
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
