# @tager/admin-services

The services layer behind [`@tager/admin-ui`](../ui): HTTP, i18n, toasts, the user
store and the shared types both packages build on.

Part of the [tager-admin-modules](../../README.md) monorepo.

## Install

```bash
yarn add @tager/admin-services
```

### Peer dependencies

`vue`, `vue-router` and `pinia` — the store and the hooks need all three.

## What's inside

**HTTP** — `request` (`get` / `post` / `put` / `delete` / `patch`) on top of
`fetch`, with access-token handling and `RequestError` carrying the status, url
and parsed body. `getMessageFromError` turns anything thrown into something
displayable; `convertRequestErrorToMap` flattens a validation response into
`field -> message`.

**Resource hooks** — `useResource`, `useResourceDelete`, `useResourceClone`,
`useResourceMove` wrap a fetch into `{ data, meta, loading, error, status }`.

**i18n** — an `i18next` instance plus `i18nPlugin` and the `useI18n` hook.
Packages register their own namespaces with `i18n.addTranslations`.

**Toasts** — `useToast` to raise one, `useToastList` to render them.

**Environment and config** — `initializeEnvironment`, `environment`, and
`configStore` for the project's own config file.

**Utilities** — type guards (`isString`, `isNumber`, `isNullish`, `isNotNullish`,
`isNotFalsy`, `isFileObject`), url helpers (`isAbsoluteUrl`, `trimTrailingSlash`,
`urlTranslit`), `createId`, `upload`.

**Types** — `Nullable`, `Nullish`, `ResponseBody`, `QueryParams`, `FileType`,
`FetchStatus` and friends.

The full surface is the export list in [`src/index.ts`](./src/index.ts).

## Development

Everything is driven from the repository root:

```bash
yarn typecheck
yarn lint
yarn test
yarn workspaces foreach run build:package
```

The package is bundled with Vite in library mode; declarations are emitted
separately by `tsc`. Tests live next to the code as `*.test.ts` and run on
Vitest.
