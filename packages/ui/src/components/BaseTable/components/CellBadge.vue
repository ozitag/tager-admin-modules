<template>
  <td :style="{ textAlign: 'center' }" class="cell-badge">
    <Badge
      v-if="label"
      :size="size"
      :text-color="textColor"
      :color="color"
      :w100="true"
    >
      {{ label }}
    </Badge>
  </td>
</template>

<script lang="ts">
import { get } from "lodash-es";
import { computed, defineComponent, type PropType } from "vue";

import type {
  RowDataDefaultType,
  ColumnDefinitionBadge,
  BadgeCellValue,
} from "../../../typings/common";
import Badge from "../../Badge";

interface Props {
  column: ColumnDefinitionBadge;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellBadge",
  components: { Badge },
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
    const value = computed<BadgeCellValue>(() => {
      return (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as BadgeCellValue;
    });

    const label = computed<string>(() =>
      typeof value.value === "string" ? value.value : value.value?.label || ""
    );

    const color = computed<string | undefined>(() =>
      typeof value.value === "string"
        ? undefined
        : value.value?.color || undefined
    );

    const textColor = computed<string | undefined>(() =>
      typeof value.value === "string"
        ? undefined
        : value.value?.textColor || undefined
    );

    return {
      label,
      color,
      textColor,
      size: props.column.size,
    };
  },
});
</script>

<style scoped lang="scss"></style>
