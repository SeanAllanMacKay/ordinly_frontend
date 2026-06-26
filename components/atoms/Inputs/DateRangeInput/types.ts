import { FormFieldInputProps } from "../../Form/types";

export type DateRangeValue = {
  start?: Date;
  end?: Date;
};

export type DateRangeInputProps = FormFieldInputProps<DateRangeValue> & {
  min?: Date;
  max?: Date;
  /** Floating labels for the two date fields (e.g. "Start" / "End"). */
  startLabel?: string;
  endLabel?: string;
};
