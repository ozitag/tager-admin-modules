import { defineComponent } from "vue";

import FormFieldError from "./FormFieldError.vue";

export default { title: "FormFieldError" };

export const Default = () =>
  defineComponent({
    components: { FormFieldError },
    template: "<FormFieldError>Required field</FormFieldError>",
  });
