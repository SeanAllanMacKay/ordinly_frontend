import React, { createContext, PropsWithChildren } from "react";

import { FormProvider, type UseFormReturn, FieldValues } from "react-hook-form";

export type FormProps<FormValues extends FieldValues> = PropsWithChildren<{
  form: UseFormReturn<FormValues>;
}>;

export const FormLoadingStateContext = createContext<{ isLoading: boolean }>({
  isLoading: false,
});

export const Form = <FormValues extends FieldValues>({
  form,
  children,
  isLoading = false,
}: FormProps<FormValues> & { isLoading?: boolean }) => (
  <FormProvider {...form}>
    <FormLoadingStateContext.Provider value={{ isLoading }}>
      {children}
    </FormLoadingStateContext.Provider>
  </FormProvider>
);
