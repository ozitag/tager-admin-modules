<template>
  <td v-html="value" />
</template>

<script lang="ts">
import get from "lodash.get";
import { computed, defineComponent, type PropType } from "vue";

import type {
  ColumnDefinitionHtml,
  RowDataDefaultType,
  StringCellValue,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionHtml;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellHtml",
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
      ) as StringCellValue;
    });

    return { value };
  },
});
</script>

<style scoped lang="scss"></style>
