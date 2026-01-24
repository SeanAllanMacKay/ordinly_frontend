import React, { PropsWithChildren } from "react";

import {
  Form as RHFForm,
  FormProvider,
  type UseFormReturn,
  FieldValues,
} from "react-hook-form";

export type FormProps<FormValues extends FieldValues> = PropsWithChildren<{
  form: UseFormReturn<FormValues>;
}>;

export const Form = <FormValues extends FieldValues>({
  form,
  children,
}: FormProps<FormValues>) => <FormProvider {...form}>{children}</FormProvider>;
