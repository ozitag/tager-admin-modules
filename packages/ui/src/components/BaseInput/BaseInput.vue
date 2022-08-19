<template>
  <input
    :value="value"
    :type="type"
    :autocomplete="autocomplete"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Props {
  value: string;
  type: string;
  autocomplete: string;
}

export default defineComponent({
  name: "BaseInput",

  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return ["text", "email", "password", "date", "time"].includes(value);
      },
    },
    autocomplete: {
      type: String,
      default: "off",
    },
  },
  emits: ["input", "change", "update:value"],
  setup(props: Props, context) {
    function getInputValueFromEvent(event: Event): string {
      return (event.target as HTMLInputElement).value;
    }

    function handleInput(event: Event) {
      const value = getInputValueFromEvent(event);
      context.emit("input", value);
      context.emit("update:value", value);
    }

    function handleChange(event: Event) {
      context.emit("change", getInputValueFromEvent(event));
    }

    return { handleInput, handleChange };
  },
});
</script>

<style scoped lang="scss">
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
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.25rem var(--input-focus-box-shadow);
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
</style>
