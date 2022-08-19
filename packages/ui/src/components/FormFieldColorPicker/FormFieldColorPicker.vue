<template>
  <FormFieldWrapper :label-for="name" :label="label" :error="error">
    <ColorPicker :value="value" v-bind="$attrs" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
      type: String,
      default: null,
    },
  },
});
</script>

<style scoped lang="scss"></style>
