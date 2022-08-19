<template>
  <FormGroup :class="containerClass">
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ fieldLabel }}
    </InputLabel>
    <MultiSelect
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      :max-selected-count="maxSelectedCount"
      v-bind="$attrs"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";
import MultiSelect from "../MultiSelect";
import type { OptionType } from "../../typings/common";

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
    FormGroup,
    FormFieldError,
    InputLabel,
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

<style scoped lang="scss"></style>
