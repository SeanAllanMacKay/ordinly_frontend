import { useCallback } from "react";
import { format as formatDate, isValid } from "date-fns";
import { useTranslation } from "react-i18next";

import { dateFnsLocale } from "./dateLocale";

export const DEFAULT_DATE_PATTERN = "MMM dd, yyyy";

/**
 * Returns a locale-aware date formatter bound to the active language. Call
 * sites pass a date-fns pattern (default `MMM dd, yyyy`); month/day names are
 * localized via the active date-fns locale. Invalid/empty input renders the
 * shared empty-value token.
 *
 *   const format = useDateFormat();
 *   format(project.dueDate);                 // "Jun 25, 2026"
 *   format(project.dueDate, "dd MMM yyyy");   // "25 Jun 2026"
 */
export function useDateFormat() {
  const { i18n, t } = useTranslation("common");
  const locale = dateFnsLocale(i18n.language);

  return useCallback(
    (value?: Date | number | string | null, pattern = DEFAULT_DATE_PATTERN) => {
      if (value === undefined || value === null || value === "") {
        return t("emptyValue");
      }
      const date = value instanceof Date ? value : new Date(value);
      return isValid(date) ? formatDate(date, pattern, { locale }) : t("emptyValue");
    },
    [locale, t],
  );
}
