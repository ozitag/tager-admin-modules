<template>
  <td>
    <div class="relations">
      <router-link v-for="item in value" :key="item.label" :to="item.to">
        <CountButton
          variant="outline-secondary"
          :count="item.quantity"
          class="margin-right"
          :disabled="item.quantity === 0"
        >
          {{ item.label }}
        </CountButton>
      </router-link>
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import CountButton from "../../CountButton/CountButton.vue";
import type {
  ColumnDefinitionRelations,
  RowDataDefaultType,
} from "../../../typings/common";

interface Props {
  column: ColumnDefinitionRelations;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellRelations",
  components: { CountButton },
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
    const value = props.column.format({
      row: props.row,
      column: props.column,
      rowIndex: props.rowIndex,
    });

    return {
      value,
    };
  },
});
</script>

<style scoped lang="scss">
.relations {
  display: flex;
  > *:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
