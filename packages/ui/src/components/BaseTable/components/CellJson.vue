<template>
  <td>
    <JsonViewer
      :value="JSON.parse(formattedValue)"
      boxed
      :expanded="true"
      expand-depth="2"
    />
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { get } from "lodash-es";
import { AsYouType } from "libphonenumber-js";

import JsonViewer from "../../JsonViewer";
import type {
  ColumnDefinitionString,
  RowDataDefaultType,
  StringCellValue,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionString;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellJson",
  components: { JsonViewer },
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

    const formattedValue = computed<string>(() => {
      if (!value.value) return "";

      if (props.column.formatter === "phone") {
        return new AsYouType().input(
          (value.value?.startsWith("+") ? "" : "+") + value.value
        );
      }
      return String(value.value);
    });

    const noWrap = props.column.noWrap || props.column.formatter === "phone";

    return { formattedValue, noWrap };
  },
});
</script>

<style scoped lang="scss"></style>
