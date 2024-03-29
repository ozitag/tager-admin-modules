<script lang="ts">
import { computed, defineComponent, h, type PropType, type Slot } from "vue";

import type {
  ColumnDefinition,
  CssClass,
  RowDataDefaultType,
} from "../../../typings/common";

import CellDate from "./CellDate.vue";
import CellString from "./CellString.vue";
import CellImage from "./CellImage.vue";
import CellLink from "./CellLink.vue";
import CellHtml from "./CellHtml.vue";
import CellColor from "./CellColor.vue";
import CellName from "./CellName.vue";
import CellFile from "./CellFile.vue";
import CellKeyValue from "./CellKeyValue.vue";
import CellList from "./CellList.vue";
import CellBoolean from "./CellBoolean.vue";
import CellBadge from "./CellBadge.vue";
import CellJson from "./CellJson.vue";
import CellRelations from "./CellRelations.vue";

// eslint-disable-next-line @typescript-eslint/ban-types
type CellComponentType = Exclude<ColumnDefinition["type"], Function>;

function getCellComponentByColumnType(
  cellType: CellComponentType
): ReturnType<typeof defineComponent> {
  switch (cellType) {
    case "datetime":
    case "date":
      return CellDate;
    case "badge":
      return CellBadge;
    case "image":
      return CellImage;
    case "link":
      return CellLink;
    case "html":
      return CellHtml;
    case "color":
      return CellColor;
    case "name":
      return CellName;
    case "key-value":
      return CellKeyValue;
    case "file":
      return CellFile;
    case "list":
      return CellList;
    case "boolean":
      return CellBoolean;
    case "json":
      return CellJson;
    case "relations":
      return CellRelations;

    default:
      return CellString;
  }
}

interface Props {
  column: ColumnDefinition;
  row: RowDataDefaultType;
  rowIndex: number;
  totalRowIndex: number;
  totalCount: number;
  scopedSlot: Slot | null;
}

export default defineComponent({
  name: "BaseCell",
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
    totalRowIndex: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    scopedSlot: {
      type: Function as PropType<Slot>,
      default: null,
    },
  },
  setup(props: Props) {
    const cellProps = computed(() => ({
      column: props.column,
      row: props.row,
      rowIndex: props.rowIndex,
      totalRowIndex: props.totalRowIndex,
      totalCount: props.totalCount,
    }));

    const cssClass = computed<CssClass>(() => {
      if (props.column.class && typeof props.column.class === "function") {
        return props.column.class({
          row: props.row,
          column: props.column,
          rowIndex: props.rowIndex,
        });
      } else {
        return props.column.class;
      }
    });

    const customCellElement = computed(() => {
      const scopedSlotNode = props.scopedSlot
        ? props.scopedSlot(cellProps.value)
        : null;

      const children = Array.isArray(scopedSlotNode)
        ? scopedSlotNode[0]
        : scopedSlotNode;

      if (!children) return null;

      const style = props.column.width
        ? Object.assign(props.column.style ?? {}, {
            width: props.column.width,
            minWidth: props.column.width,
          })
        : props.column.style;

      return props.column.useCustomDataCell
        ? children
        : h("td", { style, class: cssClass.value }, children);
    });

    const cellElement = computed(() => {
      const cellAttrs = {
        "data-table-body-cell": props.column.field,
      };

      const cellType =
        typeof props.column.type === "function"
          ? props.column.type(cellProps.value)
          : props.column.type;

      const cellComponent = getCellComponentByColumnType(
        cellType as CellComponentType
      );

      const style = props.column.width
        ? Object.assign(props.column.style ?? {}, {
            width: props.column.width,
            minWidth: props.column.width,
          })
        : props.column.style;

      return h(cellComponent, {
        ...cellProps.value,
        attrs: cellAttrs,
        style,
        class: cssClass.value,
      });
    });

    function renderFunction() {
      return customCellElement.value || cellElement.value;
    }

    return renderFunction;
  },
});
</script>

<style scoped lang="scss">
td a {
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}
</style>
