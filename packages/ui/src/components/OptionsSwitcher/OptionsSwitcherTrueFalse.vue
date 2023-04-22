<template>
  <OptionsSwitcher
    :options="options"
    :value="innerValue ? '1' : '0'"
    @change.self="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useI18n } from "@tager/admin-services";

import OptionsSwitcher from "./OptionsSwitcher.vue";

export default defineComponent({
  name: "OptionsSwitcherTrueFalse",
  components: { OptionsSwitcher },
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    trueLabel: {
      type: String,
      default: null,
    },
    trueColor: {
      type: String,
      default: null,
    },
    trueTextColor: {
      type: String,
      default: null,
    },
    falseLabel: {
      type: String,
      default: null,
    },
    falseColor: {
      type: String,
      default: null,
    },
    falseTextColor: {
      type: String,
      default: null,
    },
  },

  emits: ["change", "update:value"],
  setup(props, { emit }) {
    const innerValue = ref<boolean | null>(props.value || null);

    watch(
      () => props.value,
      () => {
        return (innerValue.value = props.value || null);
      }
    );

    const i18n = useI18n();

    const onChange = (newValue: string) => {
      innerValue.value = newValue === "1";
      emit("change", innerValue.value);
      emit("update:value", innerValue.value);
    };

    return {
      options: [
        {
          label: props.falseLabel ?? i18n.t("ui:optionsSwitcher.No"),
          value: "0",
          activeColor: props.falseColor,
          activeTextColor: props.falseTextColor,
        },
        {
          label: props.trueLabel ?? i18n.t("ui:optionsSwitcher.Yes"),
          value: "1",
          activeColor: props.trueColor,
          activeTextColor: props.trueTextColor,
        },
      ],
      innerValue,
      onChange,
    };
  },
});
</script>
