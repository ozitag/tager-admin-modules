<template>
  <div class="color-select" :style="cssVars">
    <ul class="color-list">
      <li v-for="(option, index) in options" :key="index">
        <button
          type="button"
          :class="[
            'color',
            {
              checked: isCheckedOption(option),
              'is-light': option.color ? isLight(option.color) : false,
            },
          ]"
          :style="{
            backgroundColor: option.color,
            backgroundImage: option.imageUrl ? `url(${option.imageUrl})` : null,
          }"
          :disabled="option.disabled"
          @click="handleOptionSelect(option)"
        >
          <DoneIcon
            v-if="isCheckedOption(option)"
            class="value icon-done"
            :style="{ fill: getCheckMarkIconColor(option.color) }"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  type SetupContext,
} from "vue";
import TinyColor from "tinycolor2";

import { isNotNullish } from "@tager/admin-services";

import DoneIcon from "../../icons/DoneIcon.vue";
import type { ColorOptionType } from "../../typings/common";

type ValueType = ColorOptionType | Array<ColorOptionType> | null;

interface Props {
  value: ValueType;
  options: Array<ColorOptionType>;
  multiple: boolean;
  size: number;
}

export default defineComponent({
  name: "ColorSelect",
  components: { DoneIcon },
  model: {
    event: "change",
    prop: "value",
  },
  props: {
    value: {
      type: [Object, Array] as PropType<ValueType>,
      default: null,
    },
    options: {
      type: Array as PropType<Array<ColorOptionType>>,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  emits: ["change", "update:value"],
  setup(props: Props, context: SetupContext) {
    const selectedOptions = computed<Array<ColorOptionType>>(() =>
      props.multiple
        ? (props.value as Array<ColorOptionType>)
        : [props.value as ColorOptionType | null].filter(isNotNullish)
    );

    function isCheckedOption(option: ColorOptionType): boolean {
      return selectedOptions.value.some(
        (selectedOption) => selectedOption.value === option.value
      );
    }

    function emitChangeEvent(value: ValueType) {
      context.emit("update:value", value);
      context.emit("change", value);
    }

    function handleOptionSelect(option: ColorOptionType) {
      const isChecked = isCheckedOption(option);

      if (!props.multiple) {
        emitChangeEvent(isChecked ? null : option);
        return;
      }

      const newSelectedOptions = isChecked
        ? selectedOptions.value.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : [...selectedOptions.value, option];

      emitChangeEvent(newSelectedOptions);
    }

    function getCheckMarkIconColor(backgroundColor: string): string {
      return TinyColor.mostReadable(backgroundColor, [
        "white",
        "#333",
      ]).toHexString();
    }

    function isLight(color: string) {
      const tinyColor = new TinyColor(color);
      return tinyColor.isLight();
    }

    const cssVars = computed(() => ({
      "--color-select-color-size": props.size + "px",
    }));

    return {
      isLight,
      getCheckMarkIconColor,
      isCheckedOption,
      handleOptionSelect,
      cssVars,
    };
  },
});
</script>

<style scoped lang="scss">
.color-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--color-select-color-size));
  grid-auto-rows: var(--color-select-color-size);
  gap: 10px;
}

.color {
  position: relative;
  display: block;
  cursor: pointer;
  user-select: none;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: transparent;
  background-size: cover;

  &:disabled {
    cursor: not-allowed;
  }

  .value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    pointer-events: none;

    .icon-done {
      fill: #fff;
    }
  }

  &.is-light {
    border: 1px solid #ddd;

    .icon-done {
      fill: #000;
    }
  }
}
</style>
