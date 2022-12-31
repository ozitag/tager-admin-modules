<template>
  <div class="options-switcher">
    <span
      v-for="item in options"
      :key="item.value"
      :class="item.value === innerValue ? 'active' : ''"
      @click="() => onChange(item.value)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, ref, watch } from "vue";

import type { OptionType } from "../../typings/common";

export default defineComponent({
  name: "OptionsSwitcher",
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array as PropType<Array<OptionType>>,
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
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  overflow: hidden;

  span {
    height: 40px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    flex: 1 1 1px;
    cursor: pointer;
    justify-content: center;

    &:not(:first-child) {
      border-left: 1px solid #ccc;
    }

    &.active {
      background: #ccc;
    }
  }
}
</style>
