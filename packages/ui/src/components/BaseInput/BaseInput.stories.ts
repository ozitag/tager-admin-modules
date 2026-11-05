import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import BaseInput from "./BaseInput.vue";

export default { title: "BaseInput" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseInput },
      template: `<BaseInput />`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseInput },
      setup() {
        return { args };
      },
      template: `<BaseInput placeholder="placeholder.." v-bind="args" />`,
    }),

  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "date", "time"],
    },
  },

  args: {
    value: "",
    disabled: false,
    readonly: false,
    type: "text",
  },
};

export const Readonly: StoryObj = {
  render: () => ({
    components: { BaseInput },
    template: '<BaseInput value="default text" :readonly="true" />',
  }),
};

export const Disabled: StoryObj = {
  render: () => ({
    components: { BaseInput },
    template: '<BaseInput value="default text"  :disabled="true" />',
  }),
};

export const Date: StoryObj = {
  render: () => ({
    components: { BaseInput },
    template: '<BaseInput type="date" />',
  }),
};
