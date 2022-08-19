<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <MultiSelect
      :name="name"
      :options="options"
      :selected-options="computedSelectedOptions"
      v-bind="$attrs"
      @update:selected-options="handleChange"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  type SetupContext,
} from "vue";

import { notEmpty } from "@tager/admin-services";

import MultiSelect from "../MultiSelect";
import type { OptionType } from "../../typings/common";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<OptionType>;
  value: OptionType | null;
}

export default defineComponent({
  name: "FormFieldSingleSelect",
  components: {
    MultiSelect,
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
    error: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
    },
    value: {
      type: Object as PropType<OptionType | null>,
      default: null,
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props: Props, context: SetupContext) {
    const computedSelectedOptions = computed(() => {
      return [props.value].filter(notEmpty);
    });

    function handleChange(selectedOptions: Array<OptionType>) {
      const newValue =
        selectedOptions.length > 1
          ? selectedOptions[1]
          : selectedOptions.length === 1
          ? selectedOptions[0]
          : null;

      context.emit("update:value", newValue);
    }

    return {
      handleChange,
      computedSelectedOptions,
    };
  },
});
</script>

<style scoped lang="scss"></style>
