<template>
  <div class="count-input">
    <button :disabled="minDisabled" @click="onMinusClick"><i>-</i></button>
    <span>{{ label }}</span>
    <button :disabled="maxDisabled" @click="onPlusClick"><i>+</i></button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CountInput",
  props: {
    value: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    step: {
      type: Number,
      default: 1,
    },
    labelFormatter: {
      type: Function,
      default: null,
    },
  },
  emits: ["change", "update:value"],
  setup(props, { emit }) {
    const innerValue = ref<number>(0);

    watch(
      () => props.value,
      () => (innerValue.value = props.value || 0)
    );

    const setValue = (newValue: number) => {
      innerValue.value = newValue;

      emit("change", newValue);
      emit("update:value", newValue);
    };

    const onMinusClick = () => {
      setValue(
        (innerValue.value ? innerValue.value : 0) -
          (props.step ? props.step : 1)
      );
    };

    const onPlusClick = () => {
      setValue(
        (innerValue.value ? innerValue.value : 0) +
          (props.step ? props.step : 1)
      );
    };

    const minDisabled = computed<boolean>(() => {
      return props.min !== undefined && props.min >= innerValue.value;
    });
    const maxDisabled = computed<boolean>(
      () => props.max !== undefined && props.max <= innerValue.value
    );

    const label = computed<string>(() => {
      if (props.labelFormatter) {
        return props.labelFormatter(innerValue.value);
      } else {
        return String(innerValue.value ? innerValue.value : 0);
      }
    });

    return {
      label,
      minDisabled,
      maxDisabled,
      onMinusClick,
      onPlusClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.count-input {
  height: 40px;
  display: flex;
  width: 100%;

  button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--input-border-color);
    color: var(--text-color);
    font-size: 2rem;
    transition: 0.3s all ease;

    i {
      font-style: normal;
      margin-top: -2px;
    }

    &:first-child {
      border-radius: var(--input-border-radius) 0 0 var(--input-border-radius);
    }

    &:last-child {
      border-radius: 0 var(--input-border-radius) var(--input-border-radius) 0;
    }

    &:hover:not([disabled]) {
      background: #bbb;
    }

    &[disabled] {
      opacity: 0.6;
    }
  }

  span {
    padding: 0 20px;
    height: 40px;
    flex: 1 1 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--input-border-color);
    border-bottom: 1px solid var(--input-border-color);
  }
}
</style>
