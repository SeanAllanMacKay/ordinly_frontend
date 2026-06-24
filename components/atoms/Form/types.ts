import { FieldPath, FieldValues, PathValue, Validate } from "react-hook-form";
import { ConditionalWrapperProps } from "../ContitionalWrapper";

export type FormFieldInputProps<ValueType> = {
  value: ValueType;
  onChange: (newValue: ValueType) => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  isLoading?: boolean;
  index?: number;
};

export type FormFieldArrayInputProps<ValueType> = {
  value: ValueType;
  onChange: (newValue: ValueType) => void;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  isLoading?: boolean;
  index?: number;
  onRemove?: () => void;
};

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  component: (
    props: FormFieldInputProps<PathValue<TFieldValues, TName>>,
  ) => React.ReactElement;
  validation?: Record<
    string,
    Validate<PathValue<TFieldValues, TName>, TFieldValues>
  >;
  isLoading?: boolean;
  defaultValue?: PathValue<TFieldValues, TName>;
};

export type FormFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  wrapper?: ConditionalWrapperProps["wrapper"];
  itemComponent: (
    props: FormFieldArrayInputProps<PathValue<TFieldValues, TName>> & {
      item: any;
      index: number;
      name: string;
    },
  ) => React.ReactElement;
  isLoading?: boolean;
  defaultItemValue: PathValue<TFieldValues, TName>;
  itemValidation?: Record<
    string,
    Validate<PathValue<TFieldValues, TName>, TFieldValues>
  >;
};
