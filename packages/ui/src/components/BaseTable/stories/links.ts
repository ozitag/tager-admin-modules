import type { ColumnDefinitionLink } from "../../../typings/common";
import BaseTable from "../BaseTable.vue";

interface TestEntity {
  name: string;
  link: string | null;
  link2: string | null;
}

const data: Array<TestEntity> = [
  { name: "Hello", link: "https://tut.by", link2: "https://hello" },
  { name: "Hello", link: "https://tut.by", link2: null },
  { name: "Hello", link: "https://tut.by", link2: null },
];

const defaultColumnDefs = [
  {
    id: 5,
    name: "Link cell",
    field: "link",
    type: "link",
    options: {
      shouldOpenNewTab: true,
    },
    format: ({ row }) => ({
      url: row.link,
      text: row.name,
    }),
  } as ColumnDefinitionLink<TestEntity>,
  {
    id: 5,
    name: "Link URL Null",
    field: "link",
    type: "link",
    options: {
      shouldOpenNewTab: true,
    },
    format: ({ row }) => ({
      url: row.link2,
      text: row.name,
    }),
  } as ColumnDefinitionLink<TestEntity>,
  {
    id: 5,
    name: "Link Null",
    field: "link",
    type: "link",
    options: {
      shouldOpenNewTab: true,
    },
    format: ({ row }) =>
      row.link2
        ? {
            url: row.link2,
            text: row.name,
          }
        : null,
  } as ColumnDefinitionLink<TestEntity>,
  {
    id: 5,
    name: "Link as String",
    field: "link",
    type: "link",
    options: {
      shouldOpenNewTab: true,
    },
    format: ({ row }) => row.link2,
  } as ColumnDefinitionLink<TestEntity>,
];

const linksStory = () => ({
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

export default linksStory;
