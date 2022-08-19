<template>
  <BaseButton v-bind="$attrs">
    <slot>Submit</slot>
    <span class="count">
      <span :class="{ 'hide-number': loading }">{{ count }}</span>
      <div v-if="loading" class="loading">
        <BaseSpinner />
      </div>
    </span>
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BaseButton } from "../BaseButton";
import BaseSpinner from "../BaseSpinner";

export default defineComponent({
  name: "CountButton",
  components: { BaseButton, BaseSpinner },
  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.count {
  --count-padding-left: 0.75rem;

  position: relative;
  display: inline-block;
  padding-left: var(--count-padding-left);
  margin: -0.375rem 0 -0.375rem 0.75rem;
  border-left: 1px solid currentColor;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  white-space: nowrap;

  .hide-number {
    opacity: 0;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% + (var(--count-padding-left) / 2)), -50%);
    display: flex;
  }
}
</style>
