<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label ?? ''"
    :label-for="name"
    :error="error ?? ''"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <OptionsSwitcherTrueFalse
      :name="name"
      :value="value"
      :true-label="trueLabel"
      :true-color="trueColor ? trueColor : colored ? 'var(--green)' : undefined"
      :true-text-color="
        trueTextColor ? trueTextColor : colored ? 'var(--white)' : undefined
      "
      :false-label="falseLabel"
      :false-color="
        falseColor ? falseColor : colored ? 'var(--red)' : undefined
      "
      :false-text-color="
        falseTextColor ? falseTextColor : colored ? 'var(--white)' : undefined
      "
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { Nullable } from "@tager/admin-services";

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
    /**
     * Used as `label-for` on the wrapper; it was referenced in the template
     * but never declared, so the label pointed at nothing.
     */
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String as PropType<Nullable<string>>,
      default: null,
    },
    value: {
      type: Boolean as PropType<Nullable<boolean>>,
      default: null,
    },
    trueLabel: {
      type: String,
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
    falseLabel: {
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
      type: String as PropType<Nullable<string>>,
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
    description: {
      type: String,
      default: "",
    },
    colored: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
