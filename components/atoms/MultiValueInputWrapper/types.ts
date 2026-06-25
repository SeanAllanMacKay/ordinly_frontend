import React from "react";
import { FormFieldArrayInputProps, FormFieldInputProps } from "../Form/types";

export type MultiValueInputWrapperProps<V> = FormFieldInputProps<V[]> & {
  // the shared single-value input, bound to the internal draft (undefined when empty);
  // call onCommit to move the current entry into the committed list (Enter / selection)
  component: (
    props: FormFieldInputProps<V | undefined> & {
      onCommit: (value?: V) => void;
    },
  ) => React.ReactElement;
  // render one committed value; receives onRemove (and onChange for in-place edit)
  item: (props: FormFieldArrayInputProps<V>) => React.ReactElement;
  // "compact" = horizontal flex-wrap (chips); "list" = vertical stack
  variant?: "compact" | "list";
  // validate the draft before it is committed; return a message to block + surface the error
  validate?: (value: V | undefined) => string | undefined;
  // show the "Add" button (default true); disable for inputs that auto-commit via onCommit
  showAddButton?: boolean;
};
