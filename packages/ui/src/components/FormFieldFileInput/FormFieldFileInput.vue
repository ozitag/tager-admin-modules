<template>
  <FormGroup :class="containerClass">
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
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import FileInput from "../FileInput";
import type { FileInputValueType } from "../FileInput/FileInput.types";

interface Props {
  name: string;
  label: string;
  value: FileInputValueType;
  error: string;
  urlUploadEnabled: boolean | null;
  scenario: string | null;
}

export default defineComponent({
  name: "FormFieldFileInput",
  components: {
    FormGroup,
    FormFieldError,
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
    value: [Array, Object] as PropType<FileInputValueType>,
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
  },
});
</script>
