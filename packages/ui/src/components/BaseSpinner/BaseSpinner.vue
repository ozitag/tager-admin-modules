<template>
  <svg
    class="spinner"
    viewBox="0 0 50 50"
    :width="size"
    :height="size"
    :style="{ color }"
    data-spinner
  >
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSpinner",
  props: {
    size: {
      type: [Number, String],
      default: 25,
    },
    strokeWidth: {
      type: [Number, String],
      default: 5,
    },
    color: {
      type: String,
      default: "#000",
    },
  },
});
</script>

<style scoped lang="scss">
.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;

  & .path {
    stroke: currentColor;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
