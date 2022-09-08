import { defineComponent } from "vue";
import type { Story } from "@storybook/vue3";

import BaseSpinner from "./BaseSpinner.vue";

export default { title: "BaseSpinner" };

export const Default = () =>
  defineComponent({
    components: { BaseSpinner },
    template: `
      <BaseSpinner />`,
  });

export const Playground: Story = (args) =>
  defineComponent({
    components: { BaseSpinner },
    setup() {
      return { args };
    },
    template: `
      <BaseSpinner v-bind="args"/>`,
  });

Playground.args = {
  size: 25,
  strokeWidth: 5,
};

export const Primary: Story = (args) =>
  defineComponent({
    components: { BaseSpinner },
    setup() {
      return { args };
    },
    template: `
      <BaseSpinner style="color: var(--primary)" size="40" />`,
  });
