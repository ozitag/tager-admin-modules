import { ref } from "vue";
import { StoryFn } from "@storybook/vue3";

import BaseTextArea from "./BaseTextArea.vue";

export default { title: "BaseTextArea" };

export const Default = () => ({
  components: { BaseTextArea },
  setup() {
    const value = ref("");

    return { value };
  },
  template: `<BaseTextArea v-model:value="value" />`,
});

export const Playground: StoryFn = (args) => ({
  components: { BaseTextArea },
  setup() {
    const value = ref("");

    return { value, args };
  },
  template: `<BaseTextArea v-model:value="value" v-bind="args"/>`,
});

Playground.args = {
  disabled: false,
  placeholder: "Enter some text...",
  readonly: false,
  rows: 3,
  autosize: false,
};
