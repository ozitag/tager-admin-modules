import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import CountButton from "./CountButton.vue";

export default { title: "CountButton" };

const variantArgType = {
  control: "select",
  options: [
    "primary",
    "outline-primary",
    "secondary",
    "outline-secondary",
    "icon",
  ],
};

export const Default = () =>
  defineComponent({
    components: { CountButton },
    template: `
      <CountButton></CountButton>
    `,
  });

export const Playground: StoryFn = (args) =>
  defineComponent({
    components: { CountButton },
    setup() {
      return { args };
    },
    template: `<CountButton v-bind="args" />`,
  });

Playground.argTypes = {
  variant: variantArgType,
};

Playground.args = {
  count: 0,
  variant: "primary",
  disabled: false,
  loading: false,
  href: "",
};
