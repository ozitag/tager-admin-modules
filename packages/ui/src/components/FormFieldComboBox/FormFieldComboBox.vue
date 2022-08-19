<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <ComboBox :id="name" :name="name" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ComboBox from "../ComboBox";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  name: string;
  label: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldComboBox",
  components: {
    FormFieldWrapper,
    ComboBox,
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
    error: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>
