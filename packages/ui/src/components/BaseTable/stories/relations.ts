import type { ColumnDefinitionRelations } from "../../../typings/common";
import BaseTable from "../BaseTable.vue";

interface TestEntity {
  usersCount: number;
  productsCount: number;
  itemsCount: number;
}

const data: Array<TestEntity> = [
  { usersCount: 0, productsCount: 1, itemsCount: 2 },
  { usersCount: 1, productsCount: 2, itemsCount: 3 },
  { usersCount: 3, productsCount: 0, itemsCount: 0 },
];

const defaultColumnDefs = [
  {
    id: 1,
    name: "Single",
    type: "relations",
    field: "",
    format: ({ row }) => {
      return [
        {
          label: "Users",
          quantity: row.usersCount,
          to: "/users/",
        },
      ];
    },
  } as ColumnDefinitionRelations<TestEntity>,
  {
    id: 1,
    name: "Multiple",
    type: "relations",
    field: "",
    format: ({ row }) => {
      return [
        {
          label: "Users",
          quantity: row.usersCount,
          to: {
            path: "/users/",
            query: { "filter[category]": row.usersCount },
          },
        },
        {
          label: "Products",
          quantity: row.productsCount,
          to: "/users/",
        },
        {
          label: "Items",
          quantity: row.itemsCount,
          to: "/users/",
        },
      ];
    },
  } as ColumnDefinitionRelations<TestEntity>,
];

const story = () => ({
  components: { BaseTable },
  data() {
    return {
      columnDefs: defaultColumnDefs,
      rowData: data,
      rowCssClass: (row: any) => {
        return "row-id-" + row.id;
      },
    };
  },
  template: `
    <BaseTable :column-defs="columnDefs" :row-data="rowData" :row-css-class="rowCssClass" :loading="false" :use-sticky-header="true"/>
  `,
});

export default story;
