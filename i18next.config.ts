import { defineConfig } from "i18next-cli";

/**
 * Catalog extraction config for `npx i18next-cli extract`.
 *
 * Scans the app for `t("…")` / `useTranslation(ns)` usage and scaffolds the
 * matching keys into `i18n/locales/<lang>/<ns>.json`. Run during migration to
 * discover newly added keys, and in CI to diff `es` against `en` for missing
 * translations. Existing keys (and the manually-curated `common` seed) are
 * preserved — unused keys are not auto-removed.
 *
 * Note: `util/validation/*` returns namespaced keys as plain strings rather
 * than `t()` calls, so those catalogs (`validation.json`) are maintained by
 * hand.
 */
export default defineConfig({
  locales: ["en", "es", "pt", "fr", "de"],
  extract: {
    input: [
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
      "util/**/*.{ts,tsx}",
    ],
    output: "i18n/locales/{{language}}/{{namespace}}.json",
    defaultNS: "common",
    nsSeparator: ":",
    keySeparator: ".",
    sort: true,
    removeUnusedKeys: false,
  },
});
