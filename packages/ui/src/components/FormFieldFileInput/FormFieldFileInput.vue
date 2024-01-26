<template>
  <FormFieldWrapper
    :class="containerClass"
    :error="error"
    :description="description"
    :no-error-padding="noErrorPadding"
  >
    <FileInput
      :id="name"
      :label="label"
      class="file-input"
      :name="name"
      :value="value"
      :url-upload-enabled="urlUploadEnabled"
      v-bind="$attrs"
      :scenario="scenario"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import FileInput from "../FileInput";
import type { FileInputValueType } from "../FileInput/FileInput.types";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldFileInput",
  components: {
    FormFieldWrapper,
    FileInput,
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
    urlUploadEnabled: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [Array, Object] as PropType<FileInputValueType>,
      default: null,
    },
    error: {
      type: String,
      default: "",
    },
    scenario: {
      type: String,
      default: null,
    },
    containerClass: {
      type: String,
      default: "",
    },
    description: {
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
