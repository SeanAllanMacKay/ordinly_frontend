/**
 * Statically bundled translation catalogs. Importing the JSON directly keeps
 * every string in the JS bundle (offline-first) and lets TypeScript derive the
 * key shape used for type-safe `t()` calls (see `@types/i18next.d.ts`).
 *
 * `en` is the source of truth for the key type. Other languages mirror its
 * filenames; missing keys fall back to `en` at runtime and are caught by the
 * extraction CI diff.
 */

import en_common from "./locales/en/common.json";
import en_auth from "./locales/en/auth.json";
import en_validation from "./locales/en/validation.json";
import en_projects from "./locales/en/projects.json";
import en_tasks from "./locales/en/tasks.json";
import en_clients from "./locales/en/clients.json";
import en_companies from "./locales/en/companies.json";
import en_documents from "./locales/en/documents.json";
import en_navigation from "./locales/en/navigation.json";

import es_common from "./locales/es/common.json";
import es_auth from "./locales/es/auth.json";
import es_validation from "./locales/es/validation.json";
import es_projects from "./locales/es/projects.json";
import es_tasks from "./locales/es/tasks.json";
import es_clients from "./locales/es/clients.json";
import es_companies from "./locales/es/companies.json";
import es_documents from "./locales/es/documents.json";
import es_navigation from "./locales/es/navigation.json";

export const resources = {
  en: {
    common: en_common,
    auth: en_auth,
    validation: en_validation,
    projects: en_projects,
    tasks: en_tasks,
    clients: en_clients,
    companies: en_companies,
    documents: en_documents,
    navigation: en_navigation,
  },
  es: {
    common: es_common,
    auth: es_auth,
    validation: es_validation,
    projects: es_projects,
    tasks: es_tasks,
    clients: es_clients,
    companies: es_companies,
    documents: es_documents,
    navigation: es_navigation,
  },
} as const;
