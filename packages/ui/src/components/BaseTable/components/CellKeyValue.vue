<template>
  <td :class="['key-value-cell', 'key-value-cell--' + view]">
    <template v-if="value">
      <ul v-if="view === 'column' || view === 'row'">
        <li v-for="item in value" :key="item.key">
          <span>{{ item.key }}:</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
      <table v-if="view === 'table'">
        <tbody>
          <tr v-for="item in value" :key="item.key">
            <td>{{ item.key }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </template>
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

  &--table {
    table {
      width: 100%;
      font-size: 95%;
    }

    td {
      padding: 0.5rem;
      &:first-child {
        width: 1px;
        white-space: nowrap;
      }
      &:last-child {
        font-weight: bold;
      }
    }
  }
}
</style>
