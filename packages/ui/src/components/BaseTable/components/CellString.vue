<template>
  <td>
    <div :title="shouldDisplayTitle ? formattedValue : ''">
      <span v-if="noWrap" style="white-space: nowrap">
        {{ displayValue }}
      </span>
      <template v-else>
        <Nl2Br v-if="displayValue.includes(`\n`)" :text="displayValue" />
        <template v-else>
          {{ displayValue }}
        </template>
      </template>
    </div>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { get } from "lodash-es";
import { AsYouType } from "libphonenumber-js";

import type {
  ColumnDefinitionString,
  RowDataDefaultType,
  StringCellValue,
} from "../../../typings/common";
import Nl2Br from "../../Nl2Br";

interface Props {
  column: ColumnDefinitionString;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellString",
  components: { Nl2Br },
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

    const displayValue = computed<string>(() => {
      const maxLength = props.column.options?.maxLength;
      if (!maxLength || formattedValue.value.length <= maxLength) {
        return formattedValue.value;
      }

      return formattedValue.value.substring(0, maxLength) + "...";
    });

    const shouldDisplayTitle = computed<boolean>(() => {
      const maxLength = props.column.options?.maxLength;
      return maxLength ? formattedValue.value.length > maxLength : false;
    });

    return { displayValue, formattedValue, shouldDisplayTitle, noWrap };
  },
});
</script>

<style scoped lang="scss"></style>
