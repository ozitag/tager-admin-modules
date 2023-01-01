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
        { label: i18n.t("ui:optionsSwitcher.No"), value: "0" },
        { label: i18n.t("ui:optionsSwitcher.Yes"), value: "1" },
      ],
      innerValue,
      onChange,
    };
  },
  template: `
    <OptionsSwitcher :options="options" :value="innerValue ? '1' : '0'" v-on:change.self="onChange"/>`,
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
    transition: 0.3s all ease;

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
    }
  }
}
</style>
