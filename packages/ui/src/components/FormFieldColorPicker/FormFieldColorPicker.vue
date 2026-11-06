<template>
  <FormFieldWrapper
    :label-for="name"
    :label="label"
    :error="error ?? ''"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <ColorPicker :value="value" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { Nullable } from "@tager/admin-services";

import FormFieldWrapper from "../FormFieldWrapper.vue";
import ColorPicker from "../ColorPicker";

export default defineComponent({
  name: "FormFieldColorPicker",
  components: {
    FormFieldWrapper,
    ColorPicker,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String as PropType<Nullable<string>>,
      default: null,
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

<style scoped lang="scss"></style>
