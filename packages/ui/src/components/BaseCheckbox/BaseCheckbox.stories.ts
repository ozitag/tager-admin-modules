import { defineComponent, ref } from "vue";
import type { Story } from "@storybook/vue3";

import BaseCheckbox from "./BaseCheckbox.vue";

export default {
  title: "BaseCheckbox",
};

export const Default: Story = () =>
  defineComponent({
    components: { BaseCheckbox },
    setup() {
      const isChecked = ref(false);
      return { isChecked };
    },
    template: `<BaseCheckbox v-model:checked="isChecked"></BaseCheckbox>`,
  });

export const Playground: Story = (args) =>
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

export const Checked: Story = () =>
  defineComponent({
    components: { BaseCheckbox },
    template: '<BaseCheckbox :checked="true"></BaseCheckbox>',
  });

export const Disabled: Story = () =>
  defineComponent({
    components: { BaseCheckbox },
    template: '<BaseCheckbox :disabled="true"></BaseCheckbox>',
  });
