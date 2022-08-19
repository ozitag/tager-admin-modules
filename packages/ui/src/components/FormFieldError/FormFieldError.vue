<template>
  <small><slot></slot></small>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormFieldError",
});
</script>

<style scoped lang="scss">
small {
  position: absolute;
  font-size: 80%;
  font-weight: 400;
  display: block;
  margin-top: 0.25rem;
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
