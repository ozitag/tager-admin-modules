import { StoryFn } from "@storybook/vue3";

import SearchInput from "./SearchInput.vue";

export default { title: "SearchInput" };

export const Default = () => ({
  components: { SearchInput },
  template: `<SearchInput />`,
});

export const Playground: StoryFn = (args) => ({
  components: { SearchInput },
  setup() {
    return { args };
  },
  template: `<SearchInput v-bind="args" />`,
});

Playground.args = {
  value: "",
  disabled: false,
  loading: false,
  placeholder: "Placeholder text...",
};
