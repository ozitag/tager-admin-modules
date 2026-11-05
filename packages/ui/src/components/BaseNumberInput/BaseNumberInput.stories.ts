import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import BaseNumberInput from "./BaseNumberInput.vue";

export default { title: "BaseNumberInput" };

export const Float: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseNumberInput },
      setup() {
        const value = ref(213412);

        return { value };
      },
      template: '<BaseNumberInput v-model:value="value" type="float" />',
    }),
};

export const Integer: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseNumberInput },
      setup() {
        const value = ref(null);

        return { value };
      },
      template: '<BaseNumberInput v-model:value="value" type="integer" />',
    }),
};

export const WithThousandsSeparator: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseNumberInput },
      setup() {
        const value = ref(null);

        return { value };
      },
      template:
        '<BaseNumberInput v-model:value="value" thousands-separator=" " type="integer" />',
    }),
};

export const Disabled: StoryObj = {
  render: () => ({
    components: { BaseNumberInput },
    template: "<BaseNumberInput disabled />",
  }),
};
