// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const i18next = require("eslint-plugin-i18next");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  // Guardrail against new hardcoded user-facing strings. The full migration is
  // complete, so this is enforced as an `error`. Note: JSX nested inside a
  // non-included attribute's value (e.g. `options={{ header: () => <X title="..."/> }}`)
  // is a known blind spot of this rule — translate such titles via a central
  // chokepoint component (see ScreenHeader) rather than relying on the lint.
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    plugins: { i18next },
    rules: {
      "i18next/no-literal-string": [
        "error",
        {
          // Check JSX text (Typography children) + the curated attributes
          // below. `all` would flag every JS string literal (route names,
          // object keys) and drown the migration in false positives; plain-JS
          // strings (validators, zod messages) are handled by the migration
          // patterns instead.
          mode: "jsx-only",
          "jsx-attributes": {
            include: [
              "label",
              "title",
              "subtitle",
              "placeholder",
              "content",
              "headerTitle",
            ],
          },
          callees: {
            // Restore the plugin's defaults (overriding `callees` replaces
            // them) and add our own non-i18n callees so string args to things
            // like `name.split(".")` aren't flagged.
            exclude: [
              "i18n(ext)?",
              "t",
              "require",
              "addEventListener",
              "removeEventListener",
              "postMessage",
              "getElementById",
              "dispatch",
              "commit",
              "includes",
              "indexOf",
              "endsWith",
              "startsWith",
              "split",
              "join",
              "replace",
              "match",
              "test",
              "format",
              "formatDate",
              "StyleSheet.create",
            ],
          },
          words: {
            // Overriding `words` replaces the plugin defaults, so restore the
            // punctuation/number, all-caps, and emoji patterns, then add the
            // RN enum-ish prop values that are never user-facing.
            exclude: [
              "[0-9!-/:-@[-`{-~]+",
              "[A-Z_-]+",
              "^\\p{Emoji}+$",
              "^(middle|head|tail|clip|cover|contain|stretch|center|left|right|top|bottom|none|auto)$",
            ],
          },
        },
      ],
    },
  },
]);
