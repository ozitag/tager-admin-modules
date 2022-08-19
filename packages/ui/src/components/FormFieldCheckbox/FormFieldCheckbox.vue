<template>
  <FormGroup :class="containerClass">
    <BaseCheckbox
      :id="name"
      :name="name"
      :value="value"
      :checked="checked"
      v-bind="$attrs"
    />
    <InputLabel v-if="Boolean(label)" for-checkbox :for="name">
      {{ label }}
    </InputLabel>
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCheckbox from "../BaseCheckbox";
import FormGroup from "../FormGroup.vue";
import InputLabel from "../InputLabel";
import FormFieldError from "../FormFieldError";

interface Props {
  name: string;
  label: string;
  checked: boolean;
  value: boolean;
  error: string;
}

export default defineComponent({
  name: "FormFieldCheckbox",
  components: {
    BaseCheckbox,
    FormGroup,
    FormFieldError,
    InputLabel,
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
    checked: {
      type: Boolean,
      default: false,
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

<style scoped lang="scss">
label {
  border-radius: 3px;
  transition: box-shadow 0.15s ease-in-out;
}

input:not(:disabled):focus + label,
input:not(:disabled):active + label {
  box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
}
</style>
