<template>
  <div class="options-switcher">
    <span
      v-for="item in options"
      :key="item.value"
      :class="item.value === innerValue ? 'active' : ''"
      :style="
        item.value === innerValue
          ? {
              background: item.activeColor || 'var(--input-border-color)',
              color: item.activeTextColor || '',
            }
          : {}
      "
      @click="() => onChange(item.value)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, ref, watch } from "vue";

import type { OptionsSwitcherOption } from "./OptionsSwitcher.types";

export default defineComponent({
  name: "OptionsSwitcher",
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array as PropType<Array<OptionsSwitcherOption>>,
      default: () => [],
    },
  },
  emits: ["change", "update:value"],
  setup(props, { emit }) {
    const innerValue = ref<string | null>(props.value || null);

    watch(
      () => props.value,
      () => {
        return (innerValue.value = props.value || null);
      }
    );

    const onChange = (newValue: string) => {
      innerValue.value = newValue;
      emit("change", newValue);
      emit("update:value", newValue);
    };

    return {
      innerValue,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.options-switcher {
  display: flex;
  overflow: hidden;

  span {
    height: 40px;
    font-size: 1rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    flex: 1 1 1px;
    cursor: pointer;
    justify-content: center;
    border: 1px solid var(--input-border-color);
    transition: 0.3s background ease;

    &:first-child {
      border-radius: var(--input-border-radius) 0 0 var(--input-border-radius);
    }

    &:last-child {
      border-radius: 0 var(--input-border-radius) var(--input-border-radius) 0;
    }

    &:not(:first-child) {
      border-left: 0 none;
    }

    &.active {
      background: var(--input-border-color);
      font-weight: 700;
    }
  }
}
</style>
