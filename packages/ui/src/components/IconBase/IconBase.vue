<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="title"
    role="img"
    class="icon"
  >
    <title :id="title" lang="en">{{ title }} icon</title>
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "box",
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    },
  },
});
</script>
<style>
.icon {
  fill: currentColor;
}
</style>
