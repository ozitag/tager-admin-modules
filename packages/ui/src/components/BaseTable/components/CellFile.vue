<template>
  <td>
    <a v-if="file" class="file-link" :href="file.url" target="_blank">
      <div>
        <component :is="iconComponent" />
      </div>
      <span>{{ file.name }}</span>
    </a>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import get from "lodash.get";

import type {
  ColumnDefinitionFile,
  FileCellValue,
  RowDataDefaultType,
} from "../../../typings/common";
import { getFileIconComponent } from "../../FileInput/FileInput.helpers";

interface Props {
  column: ColumnDefinitionFile;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellFile",
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
    const file = computed(() => {
      return (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as FileCellValue;
    });

    const iconComponent = computed(() => getFileIconComponent(file.value));

    return { file, iconComponent };
  },
});
</script>

<style lang="scss" scoped>
.file-link {
  max-width: 150px;
  overflow: hidden;
  display: block;
  text-align: center;
  text-overflow: ellipsis;
}
</style>
