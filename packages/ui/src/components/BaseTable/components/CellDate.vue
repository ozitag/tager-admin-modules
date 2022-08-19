<template>
  <td>{{ value }}</td>
</template>

<script lang="ts">
import get from "lodash.get";
import { computed, defineComponent, type PropType } from "vue";

import { formatDate, formatDateTime } from "../../../utils/common";
import type {
  ColumnDefinitionDate,
  ColumnDefinitionDateTime,
  DateCellValue,
  RowDataDefaultType,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionDate | ColumnDefinitionDateTime;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellDate",
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
      const date = (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as DateCellValue;

      if (!date) return " ";

      if (props.column.type === "date") {
        return formatDate(new Date(date));
      } else {
        const ignoreStartOfDayTime =
          props.column.options?.ignoreStartOfDayTime ?? true;
        return formatDateTime(new Date(date), ignoreStartOfDayTime);
      }
    });

    return { value };
  },
});
</script>

<style scoped lang="scss"></style>
