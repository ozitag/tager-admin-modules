<template>
  <div class="spinner-container"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpinnerContainer",
});
</script>

<style scoped lang="scss">
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    display: block;
  }
}
</style>
