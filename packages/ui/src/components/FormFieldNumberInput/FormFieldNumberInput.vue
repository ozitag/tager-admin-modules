<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <NumberInput
      :id="name"
      :name="name"
      :value="value"
      :thousands-separator="thousandsSeparator"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NumberInput from "../NumberInput";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
  thousandsSeparator?: string;
}

export default defineComponent({
  name: "FormFieldNumberInput",
  components: {
    NumberInput,
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
      default: null,
    },
    thousandsSeparator: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: null,
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
