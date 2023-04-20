<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
  >
    <OptionsSwitcherTrueFalse :value="value" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import OptionsSwitcherTrueFalse from "../OptionsSwitcher/OptionsSwitcherTrueFalse.vue";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldOptionsSwitcherTrueFalse",
  components: {
    OptionsSwitcherTrueFalse,
    FormFieldWrapper,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null,
    },
    value: {
      type: Boolean,
      default: null,
    },
    error: {
      type: String,
      default: null,
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
