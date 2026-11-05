import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import CountButton from "./CountButton.vue";

export default { title: "CountButton" };

const variantArgType = {
  control: "select" as const,
  options: [
    "primary",
    "outline-primary",
    "secondary",
    "outline-secondary",
    "icon",
  ],
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountButton },
      template: `
      <CountButton></CountButton>
    `,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { CountButton },
      setup() {
        return { args };
      },
      template: `<CountButton v-bind="args" />`,
    }),

  argTypes: {
    variant: variantArgType,
  },

  args: {
    count: 0,
    variant: "primary",
    disabled: false,
    loading: false,
    href: "",
  },
};
