<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <BaseTextArea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="inputValue"
      :max-height-rows="maxHeightRows"
      v-bind="$attrs"
    />
    <BaseNumberInput
      v-else-if="type === 'number'"
      :id="name"
      :name="name"
      :value="inputValue"
      :thousands-separator="thousandsSeparator"
      v-bind="$attrs"
    />
    <BaseInput
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import BaseInput from "../BaseInput";
import BaseNumberInput from "../BaseNumberInput";
import BaseTextArea from "../BaseTextArea";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormField",
  components: {
    BaseInput,
    BaseNumberInput,
    BaseTextArea,
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
    value: {
      type: String as PropType<string | null>,
      default: "",
    },
    maxHeightRows: {
      type: Number,
      default: 25,
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return [
          "text",
          "number",
          "email",
          "password",
          "date",
          "time",
          "textarea",
        ].includes(value);
      },
    },
    thousandsSeparator: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
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
  setup(props) {
    /** Значение может прийти как null: вниз отдаём всегда строку. */
    const inputValue = computed(() => props.value ?? "");

    return { inputValue };
  },
});
</script>

<style scoped lang="scss"></style>
