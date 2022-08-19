<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <ComboBox
      :id="name"
      :searchable="searchable"
      :name="name"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ComboBox from "../ComboBox";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  searchable: boolean;
  name: string;
  label: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldSelect",
  components: {
    FormFieldWrapper,
    ComboBox,
  },
  inheritAttrs: false,
  props: {
    searchable: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: String,
    error: String,
    containerClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
