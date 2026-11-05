import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import FormFieldColorPicker from "./FormFieldColorPicker.vue";

export default { title: "FormFieldColorPicker" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldColorPicker },
      setup() {
        const color = ref("");
        return { color };
      },
      template:
        '<FormFieldColorPicker v-model:value="color" name="color" label="Color" type="color" />',
    }),
};

export const WithError: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldColorPicker },
      setup() {
        const color = ref("");
        return { color };
      },
      template:
        '<FormFieldColorPicker v-model:value="color" name="color" label="Color" type="color" error="Required field" />',
    }),
};
