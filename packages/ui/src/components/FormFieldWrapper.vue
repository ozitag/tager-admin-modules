<template>
  <FormGroup :no-error-padding="noErrorPadding">
    <InputLabel v-if="Boolean(label)" :for="labelFor">{{ label }}</InputLabel>
    <slot></slot>
    <span v-if="description.length > 0" class="description">
      {{ description }}
    </span>
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormGroup from "./FormGroup.vue";
import FormFieldError from "./FormFieldError";
import InputLabel from "./InputLabel";

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

<style scoped>
.description {
  display: block;
  color: var(--input-description);
  margin-top: 0.2rem;
  font-size: 0.85rem;
}
</style>
