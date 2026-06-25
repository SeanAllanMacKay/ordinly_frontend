import { useMemo } from "react";
import { useTranslation } from "react-i18next";

/**
 * Locale-aware number and currency formatting via the Hermes-built-in `Intl`.
 * Dates use date-fns (`useDateFormat`); numbers/currency are a separate domain
 * and use `Intl.NumberFormat` keyed off the active language.
 *
 *   const { number, currency } = useNumberFormat();
 *   number(1234.5);               // "1,234.5"  / "1.234,5"
 *   currency(99.99, "USD");        // "$99.99"   / "99,99 US$"
 */
export function useNumberFormat() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return useMemo(
    () => ({
      number: (value: number, options?: Intl.NumberFormatOptions) =>
        new Intl.NumberFormat(language, options).format(value),
      currency: (value: number, currency = "USD") =>
        new Intl.NumberFormat(language, { style: "currency", currency }).format(
          value,
        ),
    }),
    [language],
  );
}
