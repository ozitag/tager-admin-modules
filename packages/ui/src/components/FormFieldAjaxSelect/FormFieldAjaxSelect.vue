<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <AjaxSelect
      :id="name"
      :request-url="requestUrl"
      :name="name"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AjaxSelect from "../AjaxSelect";
import FormFieldWrapper from "../FormFieldWrapper.vue";

export default defineComponent({
  name: "FormFieldAjaxSelect",
  components: {
    FormFieldWrapper,
    AjaxSelect,
  },
  inheritAttrs: false,
  props: {
    requestUrl: {
      type: String,
      required: true,
    },
    valueField: {
      type: String,
      default: "value",
    },
    labelField: {
      type: String,
      default: "label",
    },
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
