<template>
  <div class="progress">
    <div
      :class="['progress-bar', color || 'info']"
      :style="{ width: percent + '%' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Props {
  percent: number;
  color: "success" | "orange" | "red" | "info";
}

export default defineComponent({
  name: "BaseProgress",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      validator(value: string) {
        return ["success", "orange", "red", "info"].includes(value);
      },
      default: "info",
    },
  },
});
</script>

<style scoped lang="scss">
.progress {
  display: flex;
  height: 12px;
  overflow: hidden;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  background-color: #fff;
  border-radius: 0.15rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25) inset;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #0d6efd;
  border-radius: 0.15rem;
  transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &.success {
    background-color: #52c41a !important;
  }

  &.orange {
    background-color: #ff9800 !important;
  }

  &.red {
    background-color: #ff4d4f !important;
  }
}
</style>
