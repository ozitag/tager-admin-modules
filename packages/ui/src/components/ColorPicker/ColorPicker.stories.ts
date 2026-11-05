import { defineComponent, ref } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import ColorPicker from "./ColorPicker.vue";

export default { title: "ColorPicker" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { ColorPicker },
      setup() {
        const value = ref("");
        return { value };
      },
      template: '<ColorPicker v-model:value="value"></ColorPicker>',
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { ColorPicker },
      setup() {
        return { args };
      },
      template: '<ColorPicker v-bind="args"></ColorPicker>',
    }),

  args: {
    value: "#00ccffff",
  },
};
