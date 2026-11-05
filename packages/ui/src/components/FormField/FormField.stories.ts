import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent } from "vue";

import FormField from "./FormField.vue";

export default { title: "FormField" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          email: "",
        };
      },
      template:
        '<FormField v-model:value="email" name="email" label="Email" type="email" description="Description of the field" />',
    }),
};

export const Number: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          value: "",
        };
      },
      template:
        '<FormField v-model:value="value" name="number" type="number" label="Number" />',
    }),
};

export const NumberZero: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          value: 0,
        };
      },
      template:
        '<FormField v-model:value="value" name="number" type="number" label="Number" />',
    }),
};

export const NumberWithThousands: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          value: "",
        };
      },
      template:
        '<FormField v-model:value="value" name="number" type="number" label="Number" thousands-separator=" " />',
    }),
};

export const NoError: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          email: "",
        };
      },
      template:
        '<FormField v-model:value="email" name="email" label="Email" type="email" :no-error-padding="true" />',
    }),
};

export const WithError: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          email: "",
        };
      },
      template:
        '<FormField v-model:value="email" name="email" label="Email" type="email" error="Required field" />',
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          email: "",
        };
      },
      template:
        '<FormField v-model:value="email" name="email" label="Email" type="email" disabled />',
    }),
};

export const TextAreaField: StoryObj = {
  render: () =>
    defineComponent({
      components: { FormField },
      data() {
        return {
          email: "",
        };
      },
      template:
        '<FormField v-model:value="email" name="email" label="Description" type="textarea" error="Min length is 255 characters" />',
    }),
};
