<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
  >
    <OptionsSwitcherTrueFalse
      :value="value"
      :true-color="trueColor"
      :true-text-color="trueTextColor"
      :false-color="falseColor"
      :false-text-color="falseTextColor"
      v-bind="$attrs"
    />
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
    trueColor: {
      type: String,
      default: null,
    },
    trueTextColor: {
      type: String,
      default: null,
    },
    falseColor: {
      type: String,
      default: null,
    },
    falseTextColor: {
      type: String,
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
