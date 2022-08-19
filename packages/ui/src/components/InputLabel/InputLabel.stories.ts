import { defineComponent } from "vue";

import FormField from "../FormField";
import FormFieldCheckbox from "../FormFieldCheckbox";

export default { title: "InputLabel" };

export const ForCommonInput = () =>
  defineComponent({
    components: { FormField },
    template: '<FormField name="email" label="Email" type="email" />',
  });

export const ForCheckbox = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    template: '<FormFieldCheckbox name="isValid" label="Is valid?" />',
  });
