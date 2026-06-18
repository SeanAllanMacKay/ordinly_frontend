# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Ordinly is a cross-platform (iOS / Android / web) project-management app built with **Expo (SDK 55)**, **React Native 0.83**, **React 19**, **expo-router** (file-based routing), and **TypeScript** (strict). It manages companies, projects, tasks, milestones, phases, checklists, and documents against a REST backend.

## Commands

```bash
yarn                      # install dependencies (project uses yarn.lock)
yarn dev                  # expo start (dev server / Metro)
yarn web                  # expo start --web
yarn ios                  # expo run:ios (native build)
yarn android              # expo run:android (native build)
yarn lint                 # expo lint
yarn test                 # jest --watchAll (jest-expo preset)
yarn test -- <pattern>    # run a single test file / pattern (e.g. yarn test -- Card)
yarn generate-atom <Name> # scaffold a new atom in components/atoms/<Name>
```

Native `android/` and `ios/` directories are committed (prebuild output), so `expo run:*` builds locally. EAS build profiles live in `eas.json` (`development`, `preview`, `production`).

## Environment

Copy `.env.template` → `.env`. Required public vars (note the `EXPO_PUBLIC_` prefix needed for client access):
- `EXPO_PUBLIC_API_URL` — REST backend base URL (the API layer appends `/api`).
- `EXPO_PUBLIC_MAPBOX_PUBLIC_KEY` — Mapbox (used by `@rnmapbox/maps` and address suggestions).

## Path aliases

`@/*` maps to the repo root (see `tsconfig.json`). Import as `@/components`, `@/api`, `@/styles`, `@/constants/routes`, etc. `typedRoutes` is enabled in `app.json`, so router hrefs are type-checked.

## Architecture

### Routing (`app/`)
File-based via expo-router. Route groups gate auth:
- `app/index.tsx` — entry; queries current user and redirects to `(authenticated)` or `(unauthenticated)`.
- `app/(unauthenticated)/` — login, sign-up, verify-account.
- `app/(authenticated)/manage/` — the main app: `projects/`, `companies/`, `company/[companyId]/`, and nested `projects/[projectId]/(tabs)/{details,milestones,documents,invoices,tasks}` with deeper `tasks/[taskId]/(tabs)/{checklist,documents}`.
- `(tabs)` groups render material-top-tabs; `_layout.tsx` files configure stacks/tabs/drawers per level.
- Screens are thin: they compose a Form Provider + `Drawer`/`Screen` template and delegate to organisms. **Never hardcode route strings** — use the typed builders in `constants/routes.ts` (e.g. `routes.manage.projects.tasks.details(projectId, taskId)`).

### API layer (`api/`)
Three concentric layers, all re-exported up through `@/api`:

1. **`api/requests/`** — transport. `GET/POST/PUT/PATCH/DELETE` wrap `fetch` with `credentials: "include"` (cookie-based auth), prefix `${EXPO_PUBLIC_API_URL}/api`, and throw `{ status, error }` on non-ok responses. `serializePayload` (in `requests/util.ts`) auto-detects file-like values (Blob, `{uri,type}` objects, arrays of them) and switches the body to `multipart/form-data`; otherwise JSON.

2. **`api/entities/<entity>/requests.ts`** — per-entity request functions grouped in a `<entity>Requests` object (often nested, e.g. `projectRequests.tasks.checklist.updateChecklist`), plus a parallel `<entity>RequestKeys` object producing React Query cache keys shaped as `[METHOD, "entity", ...segments]`. Response shapes are typed via the `GET<T>`/`POST<T>` generic. Shared entity types live in `api/entities/types.ts`.

3. **`api/entities/<entity>/queries|mutations/`** — one TanStack React Query hook per file (`useGet*Query`, `useCreate*Mutation`, etc.). Queries use the matching `*RequestKeys` for `queryKey` and may `select`-transform responses (e.g. attaching `href`). Mutations call `queryClient.invalidateQueries` with the relevant key and accept an `onSuccess` callback. `QueryClient` is provided in `app/_layout.tsx`.

Entities: `users`, `projects` (+nested tasks/checklist/documents), `tasks`, `companies`, `countries`, `metadata`, `maps`.

### Components (`components/`) — Atomic Design
`atoms/` → `molecules/` → `organisms/` → `templates/`, each re-exported up to `@/components`. **Import everything from `@/components`**, not deep paths. Per-component folder convention: `Component.tsx`, `styles.ts`, `types.ts`, `index.ts`, sometimes a `*Render.tsx` / `*Skeleton.tsx`. Use `yarn generate-atom <Name>` to scaffold atoms.

- **atoms** — primitives (Button, Card, TextInput, Select, Drawer, Modal, EnrichedTextInput/Typography (tiptap rich text), Form/FormField, etc.).
- **templates** — `Screen` (KeyboardAvoidingView + loading state) and `Tabs` page shells.
- **organisms/Forms** — the dominant pattern (see below).

### Forms pattern
Built on **react-hook-form + zod** (`@hookform/resolvers`). Each form is a folder under `components/organisms/Forms/<Name>Form/` containing:
- `<Name>Schema.ts` — zod schema (resolver + inferred form-values type).
- `<Name>Provider.tsx` — sets up `useForm` and wraps children in the `Form` atom (`FormProvider` + a `FormLoadingStateContext`).
- `*Inputs.tsx` — field groups consuming form context via `FormField`.
- `*SubmissionButton.tsx` — calls the entity mutation, then `onSuccess`.

A screen composes these: `<AddProjectProvider><Drawer actions={[<AddProjectSubmissionButton onSuccess={...}/>]}><AddProjectForm/></Drawer></AddProjectProvider>`.

### Styling (`styles/`)
- **react-native-paper** is the UI/theme system. Theme (MD3 light/dark) is configured in `styles/PaperProvider.tsx`, which also routes Paper's icons through the custom `Icon` atom. Read colors via Paper's `useTheme()` (`theme.colors.*`) rather than hardcoding.
- `styles/Colors.ts`, `FontSizes.ts`, `Spacing.ts` — design tokens.
- `styles/hooks/` — responsive helpers: `useColorScheme`, `useIsPhone`, `useWidth`, `useViewHeight` (`.web.ts` variants exist for platform splits).
- Components use `StyleSheet.create` in their local `styles.ts`. `sass`/scss modules exist for web layout (e.g. `root-layout.module.scss`).

### Platform-specific files
Metro resolves `.web.ts(x)` overrides (e.g. `util/files/downloadFile/downloadFile.web.ts`, `styles/hooks/useColorScheme.web.ts`). When adding cross-platform behavior that diverges on web, add a `.web` sibling rather than branching on `Platform.OS` everywhere.

### Utilities (`util/`)
- `util/validation/` — `emailValidator`, `passwordValidator`, `requiredValidator`.
- `util/files/downloadFile/` — platform-split file download.
- `util/navigation/` — navigation helpers.

### Constants (`constants/`)
`routes.ts` (typed route builders — always use these), `breakpoints.ts`, `TASK_STATUSES.ts`, `TASK_PRIORITIES.ts`, `SCREENS_WITH_HEADERS.ts`.

## Conventions

- Add a new API capability by editing `requests.ts` (function + matching request key) for the entity, then add a query/mutation hook file and export it via the entity's `queries|mutations/index.ts`.
- Keep route screens thin; put logic in organisms/forms.
- New rich-text fields use the `EnrichedTextInput`/`EnrichedTypography` atoms (tiptap + react-native-enriched), which serialize to markdown.
