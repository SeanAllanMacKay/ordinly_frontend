import { CheckboxProps, EnrichedTextInputProps } from "@/components/atoms";
import { DateInputProps } from "@/components/atoms/DateInput/types";
import {
  FormFieldArrayProps,
  FormFieldProps,
} from "@/components/atoms/Form/types";
import { SelectProps } from "@/components/atoms/Select/types";
import { MultiSelectProps } from "@/components/atoms/MultiSelect/types";
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

export type MultiSelectInputFieldProps<ValueType> = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<MultiSelectProps<ValueType>, "options">;

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

export type AddressInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label" | "validation"
>;

export type ProjectPriorityInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;

export type ProjectStatusInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;

export type TaskPriorityInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;

export type TaskStatusInputFieldProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
