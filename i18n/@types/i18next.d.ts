import "i18next";

import type { resources } from "../resources";
import type { DEFAULT_NS } from "../config";

/**
 * Type-augment i18next so `t()` keys and `useTranslation(ns)` namespaces are
 * autocompleted and mistyped keys fail the strict build. `en` is the source of
 * truth for the key shape; other languages' completeness is enforced by the
 * extraction CI diff, not the type system.
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    // `common` is the fallback namespace, so generic keys (e.g. "save",
    // "common:error") resolve and type-check from any namespace's `t`.
    fallbackNS: "common";
    resources: (typeof resources)["en"];
    returnNull: false;
  }
}
