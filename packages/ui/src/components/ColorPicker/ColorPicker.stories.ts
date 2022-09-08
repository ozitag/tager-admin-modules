import { defineComponent, ref } from "vue";
import type { Story } from "@storybook/vue3";

import ColorPicker from "./ColorPicker.vue";

export default { title: "ColorPicker" };

export const Default = () =>
  defineComponent({
    components: { ColorPicker },
    setup() {
      const value = ref("");
      return { value };
    },
    template: '<ColorPicker v-model:value="value"></ColorPicker>',
  });

export const Playground: Story = (args) =>
  defineComponent({
    components: { ColorPicker },
    setup() {
      return { args };
    },
    template: '<ColorPicker v-bind="args"></ColorPicker>',
  });

Playground.args = {
  value: "#00ccffff",
};
