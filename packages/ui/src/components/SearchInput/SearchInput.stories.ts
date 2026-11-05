import type { StoryObj } from "@storybook/vue3-vite";

import SearchInput from "./SearchInput.vue";

export default { title: "SearchInput" };

export const Default: StoryObj = {
  render: () => ({
    components: { SearchInput },
    template: `<SearchInput />`,
  }),
};

export const Playground: StoryObj = {
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args };
    },
    template: `<SearchInput v-bind="args" />`,
  }),

  args: {
    value: "",
    disabled: false,
    loading: false,
    placeholder: "Placeholder text...",
  },
};
