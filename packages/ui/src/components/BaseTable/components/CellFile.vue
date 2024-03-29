<template>
  <td>
    <div v-if="file" class="file">
      <a class="file-link" :href="file.url" target="_blank">
        <div>
          <component :is="iconComponent" />
        </div>
        <span>{{ file.name }}</span>
      </a>
      <span v-if="!hideFileSize" class="file-size">{{
        humanFileSize(file.size)
      }}</span>
    </div>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { get } from "lodash-es";

import { humanFileSize } from "@tager/admin-services";

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

    const hideFileSize = !!props.column.options?.hideFileSize;

    return { file, iconComponent, humanFileSize, hideFileSize };
  },
});
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .file-link {
    overflow: hidden;
    display: block;
    text-align: center;
    text-overflow: ellipsis;
  }

  .file-size {
    display: block;
    text-align: center;
    font-size: 80%;
    color: #666;
  }
}
</style>
