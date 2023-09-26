<template>
  <td :class="['key-value-cell', 'key-value-cell--' + view]">
    <ul v-if="value">
      <li v-for="item in value" :key="item.key">
        <span>{{ item.key }}:</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { get } from "lodash-es";

import type {
  ColumnDefinitionKeyValue,
  KeyValueCellValue,
  RowDataDefaultType,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionKeyValue;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellKeyValue",
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
  setup(props) {
    const value = computed(() => {
      return (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as KeyValueCellValue;
    });

    const view = props.column.options?.view || "column";

    return {
      value,
      view,
    };
  },
});
</script>

<style scoped lang="scss">
.key-value-cell {
  font-size: 13px;

  li {
    &:not(:first-child) {
      margin-top: 0.313rem;
    }
  }

  &--column {
    li {
      span:first-child {
        font-weight: bold;
        display: block;
        margin-bottom: 0.15rem;
      }
    }
  }

  &--row {
    li {
      display: flex;

      span:last-child {
        font-weight: bold;
        margin-left: 0.15rem;
      }
    }
  }
}
</style>
