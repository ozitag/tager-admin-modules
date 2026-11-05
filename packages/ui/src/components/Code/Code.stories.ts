import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import BaseCode from "./Code.vue";

export default { title: "Code" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseCode },
      setup() {
        const value = ref<string>("");

        return {
          value,
        };
      },
      template: '<BaseCode v-model:value="value" />',
    }),
};
