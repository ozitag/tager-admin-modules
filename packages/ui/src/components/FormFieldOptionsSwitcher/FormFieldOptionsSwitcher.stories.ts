import { ref, watch } from "vue";

import FormFieldOptionsSwitcher from "./FormFieldOptionsSwitcher.vue";
import FormFieldOptionsSwitcherTrueFalse from "./FormFieldOptionsSwitcherTrueFalse.vue";

export default { title: "FormFieldOptionsSwitcher" };

export const Default = () => ({
  name: "DefaultFormFieldOptionsSwitcher",
  components: { FormFieldOptionsSwitcher },
  setup() {
    const value = ref<string>("1");

    watch(value, (value) => {
      console.log("value:", value);
    });

    return {
      value,
    };
  },
  template: `
    <FormFieldOptionsSwitcher
      v-model:value="value"
      :options="[
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Option 3'},
]"
      label="Visible"
    />`,
});

export const Nullable = () => ({
  name: "NullableFormFieldOptionsSwitcher",
  components: { FormFieldOptionsSwitcher },
  setup() {
    const value = ref<string>("1");

    watch(value, (value) => {
      console.log("value:", value);
    });

    return {
      value,
    };
  },
  template: `
    <FormFieldOptionsSwitcher
      v-model:value="value" :nullable="true"
      :options="[
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Option 3'},
]"
      label="Visible"
    />`,
});

export const TrueFalse = () => ({
  name: "DefaultFormFieldOptionsSwitcherTrueFalse",
  components: { FormFieldOptionsSwitcherTrueFalse },
  setup() {
    const value = ref<boolean>();

    watch(value, (value) => {
      console.log("value:", value);
    });

    return {
      value,
    };
  },
  template: `
    <FormFieldOptionsSwitcherTrueFalse
      v-model:value="value"
      label="Visible"
      :false-color="red"
      :false-text-color="white"
      :true-color="green"
      :true-text-color="white"
    />`,
});
