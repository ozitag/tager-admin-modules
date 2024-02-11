import type { ColumnDefinitionKeyValue } from "../../../typings/common";
import BaseTable from "../BaseTable.vue";

const defaultColumnDefs = [
  {
    id: 8,
    name: "Column",
    field: "taxonomies",
    type: "key-value",
    options: {
      view: "column",
    },
  } as ColumnDefinitionKeyValue<TestEntity>,
  {
    id: 9,
    name: "Row",
    field: "stats",
    type: "key-value",
    options: {
      view: "row",
    },
  } as ColumnDefinitionKeyValue<TestEntity>,
  {
    id: 9,
    name: "Table",
    field: "stats",
    type: "key-value",
    options: {
      view: "table",
    },
  } as ColumnDefinitionKeyValue<TestEntity>,
];

interface TestEntity {
  taxonomies: any;
  stats: any;
}

const defaultRowData: Array<TestEntity> = [
  {
    taxonomies: [
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
    ],
    stats: [
      { key: "Played", value: "12" },
      { key: "Wanted", value: "12" },
      { key: "Skipped", value: "12" },
    ],
  },
  {
    taxonomies: [
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
    ],
    stats: [
      { key: "Played", value: "12" },
      { key: "Wanted", value: "12" },
      { key: "Skipped", value: "12" },
    ],
  },
  {
    taxonomies: [
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
      { key: "Categories", value: "Cat 1, Cat 2, Cat 3" },
    ],
    stats: [
      { key: "Played", value: "12" },
      { key: "Wanted", value: "12" },
      { key: "Skipped", value: "12" },
    ],
  },
];

const story = () => ({
  components: { BaseTable },
  data() {
    return {
      columnDefs: defaultColumnDefs,
      rowData: defaultRowData,
      rowCssClass: (row: any) => {
        return "row-id-" + row.id;
      },
    };
  },
  template: `
    <BaseTable :column-defs="columnDefs" :row-data="rowData" :row-css-class="rowCssClass" enumerable :loading="false"
               :use-sticky-header="true">
    <template v-slot:cell(description)="{ row, column }">
      <td :style="column.style">
        <h4>{{ row[column.field] }}</h4>
        <a href="#">Test ink</a>
      </td>
    </template>
    </BaseTable>
  `,
});

export default story;
