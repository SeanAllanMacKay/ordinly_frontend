import { CheckboxProps, EnrichedTextInputProps } from "@/components/atoms";
import { DateInputProps } from "@/components/atoms/DateInput/types";
import {
  FormFieldArrayProps,
  FormFieldProps,
} from "@/components/atoms/Form/types";
import { SelectProps } from "@/components/atoms/Select/types";
import { TextInputProps } from "@/components/atoms/TextInput/types";

export type TextInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<TextInputProps, "type" | "isEditable" | "isAutoFocus">;

export type DateInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<DateInputProps, "min" | "max">;

export type SelectInputFieldProps<ValueType> = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<SelectProps<ValueType>, "options">;

export type CheckboxInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;

export type ChecklistInputFieldProps = Omit<
  FormFieldArrayProps,
  "itemComponent" | "wrapper" | "isLoading"
> & {
  labelKey: string;
  valueKey: string;
};

export type TextInputFieldArrayProps = Omit<
  FormFieldArrayProps,
  "itemComponent" | "wrapper" | "isLoading" | "defaultItemValue"
>;

export type EnrichedTextInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<EnrichedTextInputProps, "initialValue" | "label">;

export type ImageInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
