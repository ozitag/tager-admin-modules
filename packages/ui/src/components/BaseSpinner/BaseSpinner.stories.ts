import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import BaseSpinner from "./BaseSpinner.vue";

export default { title: "BaseSpinner" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseSpinner },
      template: `
      <BaseSpinner />`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseSpinner },
      setup() {
        return { args };
      },
      template: `
        <BaseSpinner v-bind="args"/>`,
    }),

  args: {
    size: 25,
    strokeWidth: 5,
    color: "#000000",
  },
};

export const Primary: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseSpinner },
      setup() {
        return { args };
      },
      template: `
        <BaseSpinner style="color: var(--primary)" size="40" />`,
    }),
};
