<template>
  <td>
    <template v-if="value">
      <div class="color-cell">
        <div class="color-cell-inner" :style="{ backgroundColor: value }" />
      </div>
      <span class="color-value">{{ value }}</span>
    </template>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import get from "lodash.get";

import type {
  ColorCellValue,
  ColumnDefinitionColor,
  RowDataDefaultType,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionColor;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellColor",
  props: {
    column: {
      type: Object as PropType<Props["column"]>,
      required: true,
    },
    row: {
      type: Object as PropType<Props["row"]>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props) {
    const value = computed(() => {
      return (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as ColorCellValue;
    });

    return { value };
  },
});
</script>

<style scoped lang="scss">
.color-cell {
  display: inline-block;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.color-cell-inner {
  border-radius: 3px;
  height: 1.8rem;
  width: 3.2rem;
}

.color-value {
  display: block;
}
</style>
