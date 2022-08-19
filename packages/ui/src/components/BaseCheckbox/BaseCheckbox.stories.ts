import { defineComponent, ref } from "vue";
import { StoryFn } from "@storybook/vue3";

import BaseCheckbox from "./BaseCheckbox.vue";

export default {
  title: "BaseCheckbox",
};

export const Default: StoryFn = () =>
  defineComponent({
    components: { BaseCheckbox },
    setup() {
      const isChecked = ref(false);
      return { isChecked };
    },
    template: `<BaseCheckbox v-model:checked="isChecked"></BaseCheckbox>`,
  });

export const Playground: StoryFn = (args) =>
  defineComponent({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: '<BaseCheckbox v-bind="args"></BaseCheckbox>',
  });

Playground.args = {
  checked: true,
  disabled: false,
};

export const Checked: StoryFn = () =>
  defineComponent({
    components: { BaseCheckbox },
    template: '<BaseCheckbox :checked="true"></BaseCheckbox>',
  });

export const Disabled: StoryFn = () =>
  defineComponent({
    components: { BaseCheckbox },
    template: '<BaseCheckbox :disabled="true"></BaseCheckbox>',
  });
