<template>
  <div
    :class="{
      'form-group': true,
      'form-group--no-error-padding': noErrorPadding,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormGroup",
  props: {
    noErrorPadding: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.form-group {
  position: relative;
  display: block;
  margin-bottom: 1.5rem;

  &--no-error-padding {
    margin-bottom: 0;
  }
}
</style>
