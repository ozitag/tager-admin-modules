<template>
  <div class="min-max__wrapper">
    <div class="min-max">
      <label>{{ $i18n.t("ui:minmax:Min") }}</label>
      <input
        type="number"
        :value="value?.min !== undefined ? value.min : ''"
        :disabled="disabled"
        @change="handleMinChange"
        @input="handleMinInput"
      />
      <label>{{ $i18n.t("ui:minmax:Max") }}</label>
      <input
        type="number"
        :value="value?.max !== undefined ? value.max : ''"
        :disabled="disabled"
        @change="handleMaxChange"
        @input="handleMaxInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import type { MinMaxValue } from "./typings";

interface Props {
  value?: MinMaxValue;
  disabled?: boolean;
}

export default defineComponent({
  name: "BaseMinMax",

  props: {
    value: {
      type: Object as PropType<MinMaxValue>,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["input", "change", "update:value"],
  setup(_props: Props, context) {
    function getInputValueFromEvent(event: Event): number | null {
      const textValue = (event.target as HTMLInputElement).value;

      return isNaN(parseFloat(textValue)) ? null : parseFloat(textValue);
    }

    function handleMinInput(event: Event) {
      const value = {
        min: getInputValueFromEvent(event),
        max: _props.value?.max,
      };

      context.emit("input", value);
      context.emit("update:value", value);
    }

    function handleMaxInput(event: Event) {
      const value = {
        min: _props.value?.min,
        max: getInputValueFromEvent(event),
      };
      context.emit("input", value);
      context.emit("update:value", value);
    }

    function handleMinChange(event: Event) {
      const value = {
        min: getInputValueFromEvent(event),
        max: _props.value?.max,
      };

      context.emit("change", value);
    }

    function handleMaxChange(event: Event) {
      const value = {
        min: _props.value?.min,
        max: getInputValueFromEvent(event),
      };

      context.emit("change", value);
    }

    return { handleMinChange, handleMaxChange, handleMinInput, handleMaxInput };
  },
});
</script>

<style scoped lang="scss">
.min-max {
  display: inline-flex;
  align-items: center;

  label {
    border: 1px solid var(--input-border-color);
    background: var(--input-border-color);
    color: #000;
    font-size: 0.75rem;
    padding: 0 0.75rem;
    height: 38px;
    display: inline-flex;
    align-items: center;

    &:first-child {
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }

  input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--input-color);
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid var(--input-border-color);
    appearance: none;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:last-child {
      border-radius: 0 0.25rem 0.25rem 0;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &:focus {
      color: var(--input-color);
      background-color: #fff;
      border-color: var(--input-focus-border-color);
      outline: 0;
      box-shadow: 0 0 0 0.1rem var(--input-focus-box-shadow);
    }

    // Placeholder
    &::-moz-placeholder {
      color: var(--input-placeholder-color);
      opacity: 1;
    }

    &::placeholder {
      color: var(--input-placeholder-color);
      // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
      opacity: 1;
    }

    // Disabled and read-only inputs
    //
    // HTML5 says that controls under a fieldset > legend:first-child won't be
    // disabled if the fieldset is disabled. Due to implementation difficulty, we
    // don't honor that edge case; we style them as disabled anyway.
    &:disabled,
    &[readonly] {
      background-color: var(--input-disabled-bg);
      // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
      opacity: 1;
    }
  }
}
</style>
