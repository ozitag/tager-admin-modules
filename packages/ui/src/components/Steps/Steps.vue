<template>
  <div class="steps">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'step',
        { 'step-finish': index < current },
        { 'step-current': index === current },
        { 'step-wait': index > current },
      ]"
    >
      <div class="step-head">
        <div v-if="index + 1 !== steps.length" class="step-line">
          <div class="step-line-inner"></div>
        </div>
        <div class="step-circle">
          <DoneIcon v-if="index < current" class="icon-done" />
          <span v-else>{{ index + 1 }}</span>
        </div>
      </div>

      <div class="step-title">
        {{ step.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type PropType } from "vue";

import DoneIcon from "../../icons/DoneIcon.vue";

interface Props {
  steps: Array<StepType>;
  current: number;
}

export interface StepType {
  title: string;
}

export default defineComponent({
  name: "BaseSteps",
  components: { DoneIcon },
  props: {
    steps: {
      type: Array as PropType<Array<StepType>>,
      default: () => [],
    },
    current: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
.steps {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step {
  flex: 1 0 0%;
}

.step-head {
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.step-line {
  position: absolute;
  top: calc(50% - var(--step-circle-size));
  left: 50%;
  right: -50%;
  height: 1px;
  background-color: var(--input-border-color);
}

.step-circle {
  --step-circle-size: 32px;

  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--step-circle-size);
  height: var(--step-circle-size);
  border-radius: 50%;

  color: var(--text-color);
  border: 2px solid var(--input-border-color);
  background-color: #fff;

  .icon-done {
    width: 20px;
    height: 20px;
    fill: var(--primary);
  }
}

.step-title {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.step-current {
  .step-circle {
    color: #fff;
    border-color: var(--primary);
    background-color: var(--primary);
  }

  .step-title {
    color: var(--primary);
  }
}

.step-finish {
  .step-circle {
    border-color: var(--primary);
  }

  .step-line {
    background-color: var(--primary);
  }

  .step-title {
    color: var(--primary);
  }
}
</style>
