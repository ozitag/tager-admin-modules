import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import FormFieldCheckbox from "./FormFieldCheckbox.vue";

export default { title: "FormFieldCheckbox" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldCheckbox },
      setup() {
        const isValid = ref(true);

        return { isValid };
      },
      template:
        '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" description="Check pls me" />',
    }),
};

export const WithError: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldCheckbox },
      data() {
        return {
          isValid: false,
        };
      },
      template:
        '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" error="Required field" />',
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldCheckbox },
      data() {
        return {
          isValid: false,
        };
      },
      template:
        '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" disabled />',
    }),
};
