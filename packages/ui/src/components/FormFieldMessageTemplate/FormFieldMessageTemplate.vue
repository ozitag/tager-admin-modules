<template>
  <div class="form-field-message-template" :class="containerClass">
    <FormFieldWrapper :label="label" :error="errorMessage">
      <BaseRichTextInput
        v-if="type === 'richText'"
        :value="value"
        v-bind="$attrs"
      />
      <BaseTextArea v-if="type === 'textArea'" :value="value" v-bind="$attrs" />
      <BaseInput v-if="type === 'text'" :value="value" v-bind="$attrs" />
    </FormFieldWrapper>

    <div class="variables">
      <Variable
        v-for="(variable, index) of variableList"
        :key="index"
        :variable="variable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import BaseInput from "../BaseInput";
import BaseRichTextInput from "../BaseRichTextInput";
import BaseTextArea from "../BaseTextArea";
import type { VariableType } from "../../typings/common";
import FormFieldWrapper from "../FormFieldWrapper.vue";

import Variable from "./components/Variable";

interface Props {
  value: string;
  type: "text" | "textArea" | "richText";
  label: string;
  errorMessage: string;
  variableList: Array<VariableType>;
}

export default defineComponent({
  name: "FormFieldMessageTemplate",
  components: {
    BaseRichTextInput,
    BaseTextArea,
    FormFieldWrapper,
    BaseInput,
    Variable,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "richText",
      validator: (value: string) =>
        ["text", "textArea", "richText"].includes(value),
    },
    label: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    variableList: {
      type: Array as PropType<Array<VariableType>>,
      default: () => [],
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss">
.form-field-message-template {
  margin-bottom: 1.5rem;

  .variables {
    display: flex;
    flex-wrap: wrap;
    margin-top: -0.5rem;
  }
}
</style>
