<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label ?? ''"
    :label-for="name"
    :error="error ?? ''"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <OptionsSwitcher
      :options="options"
      :colored="colored"
      :nullable="nullable"
      :value="value"
      :name="name"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import type { Nullable } from "@tager/admin-services";

import OptionsSwitcher from "../OptionsSwitcher/OptionsSwitcher.vue";
// Тип берётся из OptionsSwitcher, а не объявляется заново: здесь лежала
// его копия, не знавшая, что значение варианта стало nullable, из-за чего
// экспортируемый OptionsSwitcherOption перестал подходить этому же пропу.
import type { OptionsSwitcherOption } from "../OptionsSwitcher/OptionsSwitcher.types";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldOptionsSwitcher",
  components: {
    OptionsSwitcher,
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
    options: {
      type: Array as PropType<Array<OptionsSwitcherOption>>,
      default: () => [],
    },
    value: {
      type: String as PropType<Nullable<string>>,
      default: null,
    },
    nullable: {
      type: Boolean,
      default: false,
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
