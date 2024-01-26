<template>
  <FormFieldWrapper
    :description="description"
    :class="containerClass"
    :no-error-padding="noErrorPadding"
    :error="error"
  >
    <BaseCheckbox :id="name" :name="name" :checked="checked" v-bind="$attrs" />
    <InputLabel v-if="Boolean(label)" for-checkbox :for="name">
      {{ label }}
    </InputLabel>
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCheckbox from "../BaseCheckbox";
import InputLabel from "../InputLabel";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldCheckbox",
  components: {
    BaseCheckbox,
    InputLabel,
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
    checked: {
      type: Boolean,
      default: false,
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
    description: {
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
