import React from "react";
import { View } from "react-native";
import { Switch, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Card, SelectInput, Typography } from "@/components";
import { useThemePreference } from "@/styles/ThemePreference";
import { useLanguagePreference } from "@/i18n/LanguagePreference";
import {
  FALLBACK_LOCALE,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  normalizeLocale,
  type Locale,
} from "@/i18n/config";
import { personalSettingsScreenStyles as styles } from "./styles";

const LANGUAGE_OPTIONS = SUPPORTED_LOCALES.map((code) => ({
  value: code,
  label: LOCALE_LABELS[code],
}));

// All settings here apply immediately (no save button). Theme and language reuse
// the existing app-wide preference hooks; `setLanguage` already persists the
// choice to the backend (fire-and-forget) from LanguagePreference.
export const SettingsCard = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const { setPreference } = useThemePreference();
  const { language, setLanguage } = useLanguagePreference();

  return (
    <View style={styles.settingsZone}>
      <View style={styles.header}>
        <Typography size="lg" emphasis="high">
          {t("settings.title")}
        </Typography>
      </View>

      <View style={styles.settingRow}>
        <Typography>{t("settings.darkMode")}</Typography>

        <Switch
          value={theme.dark}
          onValueChange={(value) => setPreference(value ? "dark" : "light")}
        />
      </View>

      <View style={styles.settingRow}>
        <Typography>{t("settings.language")}</Typography>

        <SelectInput<Locale>
          value={normalizeLocale(language) ?? FALLBACK_LOCALE}
          onChange={setLanguage}
          options={LANGUAGE_OPTIONS}
          label={t("settings.language")}
          isDense
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.stubField}>
          <Typography>{t("settings.notifications")}</Typography>
          <Typography size="sm" color="onSurfaceVariant">
            {t("settings.comingSoon")}
          </Typography>
        </View>

        <Switch value={false} disabled />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.stubField}>
          <Typography>{t("settings.twoFactor")}</Typography>
          <Typography size="sm" color="onSurfaceVariant">
            {t("settings.comingSoon")}
          </Typography>
        </View>

        <Switch value={false} disabled />
      </View>
    </View>
  );
};
