# @tager/admin-ui

Vue 3 component library for TAGER admin panels — form fields, tables, dialogs,
icons and the stylesheet that ties them together.

Part of the [tager-admin-modules](../../README.md) monorepo.

## Install

```bash
yarn add @tager/admin-ui
```

### Peer dependencies

| Package      | Range          |
| ------------ | -------------- |
| `vue`        | `^3.2.33`      |
| `vue-router` | `^4.0.14`      |

`@tager/admin-services` comes along as a regular dependency.

## Usage

The stylesheet is published as a separate export and has to be imported once,
at the entry point of your application:

```ts
import "@tager/admin-ui/css";
```

Importing the package registers its own translations with `@tager/admin-services`
and installs a smooth-scroll polyfill, so import it before you render:

```vue
<script lang="ts">
import { BaseButton, FormField } from "@tager/admin-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { BaseButton, FormField },
  setup() {
    const name = ref("");
    return { name };
  },
});
</script>

<template>
  <FormField v-model:value="name" name="name" label="Name" />
  <BaseButton variant="primary">Save</BaseButton>
</template>
```

## What's inside

- **Form fields** — `FormField`, `FormFieldSelect`, `FormFieldFileInput`,
  `FormFieldColorInput`, `FormFieldMultiSelect` and the rest of the `FormField*`
  family, each wrapping a matching bare input.
- **Inputs** — `BaseInput`, `BaseSelect`, `BaseTextArea`, `BaseRichTextInput`,
  `ComboBox`, `MultiSelect`, `DateTimeInput`, `ColorInput`, `FileInput`.
- **Data display** — `DataTable`, `BaseTable`, `Pagination`, `FieldValue`,
  `XmlViewer`, `LoadableImage`, `Badge`, `Tag`.
- **Layout and navigation** — `PageTitle`, `NavigationGrid`, `TabList`, `Steps`,
  `ToggleSection`, `DropdownMenu`, `FormFooter`.
- **Feedback** — `ToastList`, `Spinner`.
- **Icons** — a Material-style set plus coloured file-extension icons.

The full surface is the export list in [`src/main.ts`](./src/main.ts).

## Development

From the repository root:

```bash
yarn workspace @tager/admin-ui storybook
```

Every component has stories next to it (`*.stories.ts`, CSF3). Requests are
mocked with MSW — see [`src/msw`](./src/msw).

## Browser support

The published bundle targets **ES2020** and ships source maps. The target is
pinned in `vite.config.ts` so it does not drift when Vite changes its default.
