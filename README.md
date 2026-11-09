# tager-admin-modules

Shared building blocks for TAGER admin panels: a Vue 3 component library and the
services layer underneath it, published to npm from a Yarn workspaces monorepo.

## Packages

| Package                                                     | npm                   | What it is                                                                     |
| ----------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------ |
| [`packages/ui`](./packages/ui)                               | `@tager/admin-ui`      | The component library — components, icons, styles, hooks. The main deliverable. |
| [`packages/services`](./packages/services)                   | `@tager/admin-services`| HTTP, i18n, toasts, user store and shared types. A dependency of `admin-ui`.    |
| [`packages/tools`](./packages/tools)                         | `@tager/admin-tools`   | Small CLI helpers used by the packages' own `prepack` / `postpack` steps.       |
| [`packages/rollup-plugin-lodash`](./packages/rollup-plugin-lodash) | `@tager/rollup-plugin-lodash` | Build plugin that rewrites `lodash-es` imports so they tree-shake. |

## Requirements

- **Node** `^20.19.0 || >=22.12.0` (see [`.nvmrc`](./.nvmrc)) — required by Vite 7
  and Storybook 10.
- **Yarn 3.2.2**, pinned through `packageManager` and shipped in `.yarn/releases`.
  Run `corepack enable` once and the right version is used automatically.

```bash
yarn install
```

## Commands

Run these from the repository root.

| Command              | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `yarn typecheck`     | `tsc --build` across every project in the monorepo             |
| `yarn lint`          | ESLint (flat config, see `eslint.config.mjs`)                  |
| `yarn test`          | Vitest, once                                                   |
| `yarn test:watch`    | Vitest in watch mode                                           |
| `yarn test:coverage` | Vitest with a V8 coverage report                               |
| `yarn clean`         | Remove every `dist` folder and `*.tsbuildinfo`                 |
| `yarn dev`           | `tsc --build --watch`                                          |

Per-package:

```bash
yarn workspace @tager/admin-ui storybook         # dev server on :3000
yarn workspace @tager/admin-ui build-storybook   # static build
yarn workspaces foreach run build:package        # build everything for publishing
```

## Storybook

Storybook is where the components are developed and reviewed. Stories live next to
their component as `*.stories.ts` and are written in CSF3.

Network calls are mocked with [MSW](https://mswjs.io/); handlers live in
`packages/ui/src/msw` and are registered globally in `.storybook/preview.ts`.
The service worker is served from `.storybook/public` — after upgrading `msw`,
regenerate it with `yarn msw init packages/ui/.storybook/public`.

## Tests

Vitest runs in a jsdom environment. Tests sit next to the code they cover as
`*.test.ts` and are excluded from the published build.

Coverage is currently low: the suite seeds the parts where the logic is least
obvious (request-error handling, type guards, the number parsers and the
`filter[...]` query helpers) rather than aiming at a percentage.

## Releasing

Releases go through [changesets](https://github.com/changesets/changesets).

1. Describe your change: `yarn changeset`
2. Merge to `master`.
3. `.github/workflows/publish.yml` type-checks, lints, tests, builds and then
   runs `changeset version` + `changeset publish`.

**Without a changeset nothing is published** — the workflow still succeeds, it
just has no version to release.

### Patch only

**Every release is a `patch`.** Answer `yarn changeset` with `patch` whatever
the change is — a new component, a renamed prop, a dependency bump: the third
number goes up and the first two stay where they are.

Consumers track these packages with a caret and update them without reading a
changelog, so `minor` and `major` buy nothing and cost something: a bumped
middle number leaves every `^2.0.x` consumer a release behind until someone
edits their `package.json` by hand.

`yarn run check-changesets` enforces this. It runs on commit through
lint-staged, in CI and again before publishing, and fails with the offending
file if a changeset asks for anything but a patch.

Pull requests are validated separately by `.github/workflows/ci.yml`.

## Repository layout

```
packages/
  ui/                     @tager/admin-ui
    .storybook/           Storybook 10 configuration (ESM)
    src/components/       one folder per component, with its stories
    src/msw/              request mocks used by the stories
  services/               @tager/admin-services
  tools/                  @tager/admin-tools
  rollup-plugin-lodash/   @tager/rollup-plugin-lodash
```

Each published package keeps its development entry points (`main`, `module`,
`types`) pointing at `src`, and swaps them for `dist` at pack time through the
`prepack` / `postpack` scripts in `@tager/admin-tools`.

## License

MIT
