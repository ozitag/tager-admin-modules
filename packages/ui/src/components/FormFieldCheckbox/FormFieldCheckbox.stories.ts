import { defineComponent, ref } from "vue";

import FormFieldCheckbox from "./FormFieldCheckbox.vue";

export default { title: "FormFieldCheckbox" };

export const Default = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    setup() {
      const isValid = ref(true);

      return { isValid };
    },
    template:
      '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" />',
  });

export const WithError = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    data() {
      return {
        isValid: false,
      };
    },
    template:
      '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    data() {
      return {
        isValid: false,
      };
    },
    template:
      '<FormFieldCheckbox v-model:checked="isValid" name="isValid" label="Is valid?" disabled />',
  });
