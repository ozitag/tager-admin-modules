<template>
  <div class="options-switcher">
    <span
      v-for="item in optionsFormatted"
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
import { computed, defineComponent, ref, watch } from "vue";

import type { OptionsSwitcherOption } from "./OptionsSwitcher.types";

export default defineComponent({
  name: "OptionsSwitcher",
  props: {
    value: {
      type: String,
      default: null,
    },
    nullable: {
      type: Boolean,
      default: false,
    },
    colored: {
      type: Boolean,
      default: false,
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
      if (innerValue.value === newValue) {
        if (props.nullable) {
          innerValue.value = null;
          emit("change", newValue);
          emit("update:value", null);
        }
        return;
      }

      innerValue.value = newValue;
      emit("change", newValue);
      emit("update:value", newValue);
    };

    const optionsFormatted = computed<Array<OptionsSwitcherOption>>(() => {
      return props.options.map((option) => {
        return {
          ...option,

          activeColor:
            props.colored && !option.activeColor
              ? "var(--green)"
              : option.activeColor,

          activeTextColor:
            props.colored && !option.activeTextColor
              ? "var(--white)"
              : option.activeTextColor,
        };
      });
    });

    return {
      innerValue,
      onChange,
      optionsFormatted,
    };
  },
});
</script>

<style lang="scss" scoped>
.options-switcher {
  display: flex;
  overflow: hidden;

  span {
    height: 38px;
    font-size: 1rem;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    flex: 1 1 1px;
    cursor: pointer;
    justify-content: center;
    border: 1px solid var(--input-border-color);
    transition: 0.3s background ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

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
