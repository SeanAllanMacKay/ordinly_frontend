import { EachDayOfIntervalResult } from "date-fns";
import { FormFieldInputProps } from "../../Form/types";
import { PropsWithChildren } from "react";

export type DateInputProps = FormFieldInputProps<Date | undefined> & {
  min?: Date;
  max?: Date;
};

export type DatePicketContextProps = Pick<
  DateInputProps,
  "value" | "min" | "max" | "onChange"
>;

export type DatePickerProviderProps = PropsWithChildren<DatePicketContextProps>;

export type DateInputContextValueType = DatePicketContextProps & {
  defaultDate: Date;
  activeMonth: EachDayOfIntervalResult<{ start: Date; end: Date }, undefined>[];
  setActiveMonth: (newMonth: Date[][]) => void;
  midpoint: Date;
};

export type DatePickerModalProps = Pick<
  DateInputProps,
  "value" | "min" | "max" | "onChange"
> & { isOpen: boolean; onClose: () => void };

export type DatePickerModalContentProps = Pick<
  DatePickerModalProps,
  "isOpen" | "onClose"
>;
