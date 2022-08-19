<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="labelFor">{{ label }}</InputLabel>
    <slot></slot>
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { Nullable } from "@tager/admin-services";

import FormGroup from "./FormGroup.vue";
import FormFieldError from "./FormFieldError";
import InputLabel from "./InputLabel";

type Props = {
  name: string;
  label: string;
  error: Nullable<string>;
};

export default defineComponent({
  name: "FormFieldWrapper",
  components: { FormGroup, FormFieldError, InputLabel },
  props: {
    labelFor: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>
