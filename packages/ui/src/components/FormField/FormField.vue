<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
  >
    <BaseTextArea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="value"
      v-bind="$attrs"
    />
    <BaseNumberInput
      v-else-if="type === 'number'"
      :id="name"
      :name="name"
      :value="value"
      :thousands-separator="thousandsSeparator"
      v-bind="$attrs"
    />
    <BaseInput
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseInput from "../BaseInput";
import BaseNumberInput from "../BaseNumberInput";
import BaseTextArea from "../BaseTextArea";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormField",
  components: {
    BaseInput,
    BaseNumberInput,
    BaseTextArea,
    FormFieldWrapper,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return [
          "text",
          "number",
          "email",
          "password",
          "date",
          "time",
          "textarea",
        ].includes(value);
      },
    },
    thousandsSeparator: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
    noErrorPadding: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
