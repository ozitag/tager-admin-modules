import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent } from "vue";

import FormFieldError from "./FormFieldError.vue";

export default { title: "FormFieldError" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormFieldError },
      template: "<FormFieldError>Required field</FormFieldError>",
    }),
};
