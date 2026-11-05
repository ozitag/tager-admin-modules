import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import BaseMinMax from "./BaseMinMax.vue";

export default { title: "BaseMinmax" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseMinMax },
      template: `
      <BaseMinMax/>`,
    }),
};

export const Disabled: StoryObj = {
  render: () => ({
    components: { BaseMinMax },
    template: '<BaseMinMax :value="{min: 0, max: 10000}" :disabled="true" />',
  }),
};
