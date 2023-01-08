<template>
  <td :style="{ textAlign: 'center' }">
    <template v-if="value !== null && column.view !== 'TICK'">
      {{
        value
          ? column.trueLabel || $i18n.t("ui:Yes")
          : column.falseLabel || $i18n.t("ui:No")
      }}
    </template>
    <DoneIcon v-else-if="value === true" />
  </td>
</template>

<script lang="ts">
import { get } from "lodash-es";
import { computed, defineComponent, type PropType } from "vue";

import type {
  ColumnDefinitionBoolean,
  BooleanCellValue,
  RowDataDefaultType,
} from "../../../typings/common";
import { DoneIcon } from "../../../icons/mod";

interface Props {
  column: ColumnDefinitionBoolean;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellBoolean",
  components: { DoneIcon },
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
    const value = computed<BooleanCellValue>(() => {
      return (
        props.column.value
          ? props.column.value({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as BooleanCellValue;
    });

    return { value };
  },
});
</script>

<style scoped lang="scss"></style>
