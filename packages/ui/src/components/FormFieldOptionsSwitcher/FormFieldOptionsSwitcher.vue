<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <OptionsSwitcher
      :options="options"
      :colored="colored"
      :nullable="nullable"
      :value="value"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import type { OptionType } from "../../typings/common";
import OptionsSwitcher from "../OptionsSwitcher/OptionsSwitcher.vue";
import FormFieldWrapper from "../FormFieldWrapper.vue";

type OptionsSwitcherOption = OptionType & {
  activeColor?: string;
  activeTextColor?: string;
};

export default defineComponent({
  name: "FormFieldOptionsSwitcher",
  components: {
    OptionsSwitcher,
    FormFieldWrapper,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array as PropType<Array<OptionsSwitcherOption>>,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
    nullable: {
      type: Boolean,
      default: false,
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
    colored: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
