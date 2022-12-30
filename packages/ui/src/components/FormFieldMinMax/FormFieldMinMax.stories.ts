import { ref, watch } from "vue";

import type { MinMaxValue } from "../BaseMinMax";

import FormFieldMinMax from "./FormFieldMinMax.vue";

export default { title: "FormFieldMinMax" };

export const Default = () => ({
  name: "DefaultFormFieldMinMax",
  components: { FormFieldMinMax },
  setup() {
    const value = ref<MinMaxValue>({
      min: 0,
      max: 50,
    });

    watch(value, (value) => {
      console.log("value:", value);
    });

    return {
      value,
    };
  },
  template: `
    <FormFieldMinMax
      v-model:value="value"
      label="Car age"
    />`,
});

export const WithError = () => ({
  components: { FormFieldMinMax },
  data() {
    return {
      value: {
        min: 0,
        max: 1000,
      },
    };
  },
  template:
    '<FormFieldMinMax v-model:value="value" label="Car age" error="Required field" />',
});

export const Disabled = () => ({
  components: { FormFieldMinMax },
  data() {
    return {
      value: {
        min: 0,
        max: 1000,
      },
    };
  },
  template:
    '<FormFieldMinMax v-model:value="value" label="Car age" disabled />',
});
