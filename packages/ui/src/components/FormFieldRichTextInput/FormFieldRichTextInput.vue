<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <BaseRichTextInput :id="name" :name="name" :value="value" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseRichTextInput from "../BaseRichTextInput";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  name: string;
  label: string;
  value: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldRichTextInput",
  components: {
    FormFieldWrapper,
    BaseRichTextInput,
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

<style scoped lang="scss"></style>
