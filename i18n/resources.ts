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

import pt_common from "./locales/pt/common.json";
import pt_auth from "./locales/pt/auth.json";
import pt_validation from "./locales/pt/validation.json";
import pt_projects from "./locales/pt/projects.json";
import pt_tasks from "./locales/pt/tasks.json";
import pt_clients from "./locales/pt/clients.json";
import pt_companies from "./locales/pt/companies.json";
import pt_documents from "./locales/pt/documents.json";
import pt_navigation from "./locales/pt/navigation.json";

import fr_common from "./locales/fr/common.json";
import fr_auth from "./locales/fr/auth.json";
import fr_validation from "./locales/fr/validation.json";
import fr_projects from "./locales/fr/projects.json";
import fr_tasks from "./locales/fr/tasks.json";
import fr_clients from "./locales/fr/clients.json";
import fr_companies from "./locales/fr/companies.json";
import fr_documents from "./locales/fr/documents.json";
import fr_navigation from "./locales/fr/navigation.json";

import de_common from "./locales/de/common.json";
import de_auth from "./locales/de/auth.json";
import de_validation from "./locales/de/validation.json";
import de_projects from "./locales/de/projects.json";
import de_tasks from "./locales/de/tasks.json";
import de_clients from "./locales/de/clients.json";
import de_companies from "./locales/de/companies.json";
import de_documents from "./locales/de/documents.json";
import de_navigation from "./locales/de/navigation.json";

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
  pt: {
    common: pt_common,
    auth: pt_auth,
    validation: pt_validation,
    projects: pt_projects,
    tasks: pt_tasks,
    clients: pt_clients,
    companies: pt_companies,
    documents: pt_documents,
    navigation: pt_navigation,
  },
  fr: {
    common: fr_common,
    auth: fr_auth,
    validation: fr_validation,
    projects: fr_projects,
    tasks: fr_tasks,
    clients: fr_clients,
    companies: fr_companies,
    documents: fr_documents,
    navigation: fr_navigation,
  },
  de: {
    common: de_common,
    auth: de_auth,
    validation: de_validation,
    projects: de_projects,
    tasks: de_tasks,
    clients: de_clients,
    companies: de_companies,
    documents: de_documents,
    navigation: de_navigation,
  },
} as const;
