<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <BaseMinMax :name="name" :value="value" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { MinMaxValue } from "../BaseMinMax/typings";
import BaseMinMax from "../BaseMinMax";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldMinMax",
  components: {
    BaseMinMax,
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
      type: String,
      default: null,
    },
    value: {
      type: Object as PropType<MinMaxValue>,
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
    description: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
