import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent } from "vue";

import FormField from "../FormField";
import FormFieldCheckbox from "../FormFieldCheckbox";

export default { title: "InputLabel" };

export const ForCommonInput: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      template: '<FormField name="email" label="Email" type="email" />',
    }),
};

export const ForCheckbox: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldCheckbox },
      template: '<FormFieldCheckbox name="isValid" label="Is valid?" />',
    }),
};
