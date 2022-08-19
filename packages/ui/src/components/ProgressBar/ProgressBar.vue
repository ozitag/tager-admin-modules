<template>
  <div class="progress-container">
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
  color: string;
}

export default defineComponent({
  name: "ProgressBar",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss">
.progress-container {
  display: flex;
  height: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
}

@keyframes progress-bar-stripes {
  0% {
    background-position: 40px 0;
  }
  100% {
    background-position: 0 0;
  }
}

.progress-bar {
  animation: progress-bar-stripes 1s linear infinite;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  transition: width 0.6s ease;

  &.primary {
    background-color: var(--primary);
  }
  &.secondary {
    background-color: var(--secondary);
  }
  &.info {
    background-color: var(--info);
  }
  &.warning {
    background-color: var(--warning);
  }
  &.danger {
    background-color: var(--danger);
  }
  &.success {
    background-color: var(--success);
  }
}
</style>
