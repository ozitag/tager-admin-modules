import { defineComponent, ref } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import BaseCheckbox from "./BaseCheckbox.vue";

export default {
  title: "BaseCheckbox",
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseCheckbox },
      setup() {
        const isChecked = ref(false);
        return { isChecked };
      },
      template: `<BaseCheckbox v-model:checked="isChecked"></BaseCheckbox>`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseCheckbox },
      setup() {
        return { args };
      },
      template: '<BaseCheckbox v-bind="args"></BaseCheckbox>',
    }),

  args: {
    checked: true,
    disabled: false,
  },
};

export const Checked: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseCheckbox },
      template: '<BaseCheckbox :checked="true"></BaseCheckbox>',
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseCheckbox },
      template: '<BaseCheckbox :disabled="true"></BaseCheckbox>',
    }),
};
