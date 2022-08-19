import { defineComponent } from "vue";
import BaseSpinner from "./BaseSpinner.vue";
import { StoryFn } from "@storybook/vue3";

export default { title: "BaseSpinner" };

export const Default = () =>
  defineComponent({
    components: { BaseSpinner },
    template: `
      <BaseSpinner />`,
  });

export const Playground: StoryFn = (args) =>
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

export const Primary: StoryFn = (args) =>
  defineComponent({
    components: { BaseSpinner },
    setup() {
      return { args };
    },
    template: `
      <BaseSpinner style="color: var(--primary)" size="40" />`,
  });
