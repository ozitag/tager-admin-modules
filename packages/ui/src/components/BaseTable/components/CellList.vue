<template>
  <td class="list-cell">
    <ul v-if="value">
      <li v-for="item in value" :key="String(item)">
        <template v-if="typeof item === 'string'">
          {{ item }}
        </template>
        <RouterLink v-else :to="String(item.url)">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { get } from "lodash-es";
import { RouterLink } from "vue-router";

import type {
  ColumnDefinitionList,
  ListCellValue,
  RowDataDefaultType,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionList;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellKeyValue",
  components: { RouterLink },
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
    const value = computed<ListCellValue>(() => {
      return (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as ListCellValue;
    });

    return {
      value,
    };
  },
});
</script>

<style scoped lang="scss">
.list-cell {
  li {
    margin-top: 5px;

    &:first-child {
      margin-top: 0;
    }

    padding-left: 10px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      display: block;
      left: 0px;
      height: 1px;
      top: 10px;
      width: 5px;
      background: var(--secondary);
    }
  }
}
</style>
