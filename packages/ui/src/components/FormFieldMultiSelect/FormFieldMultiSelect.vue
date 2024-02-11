<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <MultiSelect
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      :max-selected-count="maxSelectedCount"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import type { OptionType } from "../../typings/common";
import MultiSelect from "../MultiSelect";
import FormFieldWrapper from "../FormFieldWrapper.vue";

function isValidSelectOption(option: OptionType) {
  return typeof option === "object" && "value" in option && "label" in option;
}

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<OptionType>;
  selectedOptions: Array<OptionType>;
  maxSelectedCount: number;
}

export default defineComponent({
  name: "FormFieldMultiSelect",
  components: {
    FormFieldWrapper,
    MultiSelect,
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
    error: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    selectedOptions: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    maxSelectedCount: {
      type: Number,
      default: 0,
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
  setup(props: Props) {
    const fieldLabel = computed(() => {
      const countLabel =
        props.options.length > 0
          ? `(${props.selectedOptions.length} of ${props.options.length})`
          : "";
      return [props.label, countLabel].join(" ");
    });

    return {
      fieldLabel,
    };
  },
});
</script>
