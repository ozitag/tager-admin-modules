<template>
  <div class="sort-container">
    <span :class="{ disabled: disabled }">{{ $i18n.t("ui:sortBy") }}:</span>
    <ComboBox
      :searchable="false"
      :options="options"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import ComboBox from "../../../ComboBox/ComboBox.vue";
import type { OptionType } from "../../../../typings/common";

export interface SortProps {
  options: Array<OptionType>;
  value: OptionType;
}

export default defineComponent({
  name: "SortComponent",
  components: {
    ComboBox,
  },
  props: {
    options: {
      type: Array as PropType<SortProps["options"]>,
      default: () => [],
    },
    value: {
      type: Object as PropType<SortProps["value"]>,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: { change: null },
  setup: (_props, context) => {
    function handleChange(sortValue: OptionType) {
      context.emit("change", sortValue.value);
    }

    return {
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.sort-container {
  display: flex;
  align-items: center;
  min-width: 250px;

  > span {
    display: block;
    margin-right: 5px;
    white-space: nowrap;

    &.disabled {
      opacity: 0.5;
    }
  }
}
</style>
