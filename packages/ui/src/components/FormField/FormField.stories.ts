import { defineComponent } from "vue";

import FormField from "./FormField.vue";

export default { title: "FormField" };

export const Default = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: "",
      };
    },
    template:
      '<FormField v-model:value="email" name="email" label="Email" type="email" />',
  });

export const Number = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        value: "",
      };
    },
    template:
      '<FormField v-model:value="value" name="number" type="number" label="Number" />',
  });

export const NumberWithThousands = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        value: "",
      };
    },
    template:
      '<FormField v-model:value="value" name="number" type="number" label="Number" thousands-separator=" " />',
  });

export const NoError = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: "",
      };
    },
    template:
      '<FormField v-model:value="email" name="email" label="Email" type="email" :no-error-padding="true" />',
  });

export const WithError = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: "",
      };
    },
    template:
      '<FormField v-model:value="email" name="email" label="Email" type="email" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: "",
      };
    },
    template:
      '<FormField v-model:value="email" name="email" label="Email" type="email" disabled />',
  });

export const TextAreaField = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: "",
      };
    },
    template:
      '<FormField v-model:value="email" name="email" label="Description" type="textarea" error="Min length is 255 characters" />',
  });
