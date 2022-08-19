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
      required: true,
    },
    width: {
      type: [Number, String],
      default: 24,
      required: true,
    },
    height: {
      type: [Number, String],
      default: 24,
      required: true,
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
      required: true,
    },
  },
});
</script>
<style>
.icon {
  fill: currentColor;
}
</style>
