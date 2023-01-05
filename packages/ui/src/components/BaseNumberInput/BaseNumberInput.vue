<template>
  <BaseInput
    :value="formattedNumber"
    v-bind="$attrs"
    @keydown="handleKeydown"
    @update:value="handleValueUpdate"
  />
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import { DOT_REGEXP, SPACE_REGEXP } from "../../utils/common";
import BaseInput from "../BaseInput";

type Props = {
  value: number | string;
  type: "integer" | "float" | "";
  thousandsSeparator: string;
  asString: boolean;
};

export default defineComponent({
  name: "BaseNumberInput",
  components: { BaseInput },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    thousandsSeparator: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<Props["type"]>,
      default: "",
      validator(value: string) {
        return !value || ["integer", "float"].includes(value);
      },
    },
    asString: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:value"],
  setup(props: Props, context) {
    const isFloat = props.type !== "integer";

    const formattedNumber = computed<string>(() => {
      if (!props.value) return "";

      const containsDot = String(props.value).includes(".");
      const [integer, fraction] = props.value
        ? String(props.value).split(".")
        : [];

      /** e.g. "12345678" => "12 345 678" */
      const formattedInteger = props.thousandsSeparator
        ? integer
          ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, props.thousandsSeparator)
          : ""
        : integer;

      return [formattedInteger, containsDot ? "." : "", fraction]
        .filter(Boolean)
        .join("");
    });

    function normalizeDots(value: string): string {
      return value.replace(DOT_REGEXP, ".");
    }

    function normalizeNumber(formattedNumber: string): string | number {
      const value = normalizeDots(formattedNumber).replace(SPACE_REGEXP, "");

      const valueFormatted = isFloat ? parseFloat(value) : parseInt(value);
      return props.asString ? String(valueFormatted) : valueFormatted;
    }

    function handleKeydown(event: KeyboardEvent) {
      const ALLOWED_KEYS = ["ArrowLeft", "ArrowRight", "Delete", "Backspace"];
      const DOTS = [",", "."];

      const isValueContainsDot = DOTS.some(
        (dotChar) =>
          String(props.value) && String(props.value).includes(dotChar)
      );

      if (isFloat && !isValueContainsDot) {
        ALLOWED_KEYS.push(...DOTS);
      }

      function isKeyAllowed(key: string) {
        if (key >= "0" && key <= "9") return true;

        return ALLOWED_KEYS.includes(key);
      }

      if (event.ctrlKey || event.metaKey) {
        return;
      }

      if (!isKeyAllowed(event.key)) {
        event.preventDefault();
      }
    }

    function handleValueUpdate(value: string) {
      context.emit("update:value", normalizeNumber(value));
    }

    return {
      formattedNumber,
      handleKeydown,
      handleValueUpdate,
    };
  },
});
</script>

<style scoped lang="scss"></style>
