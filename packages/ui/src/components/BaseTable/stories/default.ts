import type { FileType, Nullable } from "@tager/admin-services";

import type {
  ColumnDefinitionColor,
  ColumnDefinitionFile,
  ColumnDefinitionHtml,
  ColumnDefinitionImage,
  ColumnDefinitionJson,
  ColumnDefinitionKeyValue,
  ColumnDefinitionName,
} from "../../../typings/common";
import BaseTable from "../BaseTable.vue";

const defaultColumnDefs = [
  {
    id: 100,
    name: "Name",
    type: "name",
    field: "name",
    width: "20%",
    format: ({ row }) => {
      return {
        adminLink: {
          url: "/products/40",
          text: row.name,
          subtext: "3mL/R.8mR/L",
        },
        paramList: [
          { name: "Код товара", value: "691.725" },
          { name: "Штрих-код", value: "728360599674" },
        ],
        websiteLink: {
          url: row.urlDisabled ? null : row.url,
          text: row.url,
        },
      };
    },
    options: {
      shouldOpenNewTab: false,
      displayFullWebsiteLink: true,
      // shouldUseRouter: false,
    },
  } as ColumnDefinitionName<TestEntity> /*
  {
    id: 102,
    name: "Phone",
    field: "phone",
    type: "string",
    formatter: "phone",
  } as ColumnDefinitionString<TestEntity>,
  {
    id: 100,
    name: "Status",
    field: "status",
    type: "badge",
    format: ({ row }) => {
      return row.active
        ? { label: "Active", color: "green", textColor: "white" }
        : { label: "Disabled", color: "red", textColor: "black" };
    },
  } as ColumnDefinitionBadge<TestEntity>,
  {
    id: 98,
    name: "Active",
    field: "active",
    type: "boolean",
  } as ColumnDefinitionBoolean<TestEntity>,
  /* {
   id: 99,
   name: "Active2",
   field: "active",
   type: "boolean",
   view: "TICK",
 } as ColumnDefinitionBoolean<TestEntity>,
 {
   id: 100,
   name: "Active3",
   type: "boolean",
   view: "TICK",
   value: ({row}) => {
     return row.name === 'Ivan';
   },
   style: {
     textAlign: 'right'
   }
 } as ColumnDefinitionBoolean<TestEntity>,
 {
   id: 100,
   name: "Active4",
   type: "boolean",
   trueLabel: "+",
   falseLabel: "-",
   value: ({row}) => {
     return row.name === 'Ivan';
   }
 } as ColumnDefinitionBoolean<TestEntity>,

  {
    id: 1,
    name: "ID (10%)",
    field: "id",
    style: { width: "10%" },
    class: ({ row }) => {
      return ["id-cell", "id-cell-" + row.id];
    },
  } as ColumnDefinitionCommon<TestEntity>,*/,
  {
    id: 2,
    name: "String Color (30%)",
    field: "color",
    type: "color",
    class: ({ row }) => {
      return ["color-cell", "color-cell-" + row.id];
    },
  } as ColumnDefinitionColor<TestEntity>,
  {
    id: 3,
    name: "MultiLine",
    field: "name",
  },
  // {
  //   id: 2,
  //   name: 'String cell (30%)',
  //   field: 'name',
  //   type: 'string',
  // },
  {
    id: 2.5,
    name: "Image cell",
    field: "image.url",
    type: "image",
    // style: { width: '40%' },
    // options: {
    //   justifyContent: 'flex-start',
    // },
  } as ColumnDefinitionImage<TestEntity>,
  {
    id: 2.7,
    name: "HTML cell",
    field: "content",
    type: "html",
  } as ColumnDefinitionHtml<TestEntity>,
  /* {
    id: 3,
    name: "Date cell (30%)",
    field: "date",
    type: "date",
    style: {
      width: "30%",
      textAlign: "center",
      verticalAlign: "top",
      backgroundColor: "wheat",
    },
  } as ColumnDefinitionDate<TestEntity>,
  {
    id: 4,
    name: "Custom cell (20%)",
    field: "description",
    useCustomDataCell: true,
    style: { width: "20%" },
  } as ColumnDefinitionCommon<TestEntity>,
  {
    id: 5,
    name: "Link cell (10%)",
    field: "link",
    type: "link",
    options: {
      shouldOpenNewTab: true,
      // shouldUseRouter: false,
    },
    style: { width: "10%" },
    // format: ({ row, column }) => ({
    //   url: row[column.field],
    //   text: row.link,
    // }),
  } as ColumnDefinitionLink<TestEntity>,*/
  {
    id: 6,
    name: "File cell",
    field: "file",
    type: "file",
  } as ColumnDefinitionFile<TestEntity>,
  {
    id: 7,
    name: "JSON",
    field: "json",
    type: "json",
  } as ColumnDefinitionJson<TestEntity>,
  {
    id: 8,
    name: "Key-Value",
    field: "taxonomies",
    type: "key-value",
    // options: {
    //   view: "column",
    // },
  } as ColumnDefinitionKeyValue<TestEntity>,
  {
    id: 9,
    name: "Stats",
    field: "stats",
    type: "key-value",
    options: {
      view: "row",
    },
  } as ColumnDefinitionKeyValue<TestEntity>,
];

interface TestEntity {
  id: number;
  phone?: string;
  active: boolean;
  name: string;
  url: Nullable<string>;
  urlDisabled?: boolean;
  color: string;
  content: string;
  image: { url: string };
  date: string;
  link: string;
  description: string;
  file: Nullable<FileType>;
  json: string;
  taxonomies: any;
  stats: any;
}

const defaultRowData: Array<TestEntity> = [
  {
    id: 1,
    phone: "375296704790",
    active: false,
    name: "Makeup\nPurple",
    url: "https://banuba-catalog.dev.ozitag.com/beautification/eyes-hazel",
    color: "#374635",
    content: "<p>simple header <h3>Title</h3></p>",
    image: {
      url: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg",
    },
    date: new Date().toISOString(),
    link: "/presets",
    description:
      "Some descriptionSome description Some description Some description Some description Some description Some description Some description Some description Some description",
    file: {
      id: "80d47541-e186-481a-8add-a4a351e62b6d",
      mime: "application/zip",
      name: "D5rg88TvA1.zip",
      size: 1059388,
      url: "https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip",
    },
    json: '{"amplitudeEvent":{"name":"AppOpenedWithNotification","params":[{"param":"type","value":"pre-release"},{"param":"id","value":"26667"}]},"action":{"screen":"game","id":24719}}',
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
    id: 2,
    phone: "48451670377",
    active: true,
    color: "rgba(222,111,123,0.8)",
    name: "Ivan",
    url: "https://banuba-catalog.dev.ozitag.com/interactive-background/golden-confetti",
    content: "<p>simple header <em>Title</em></p>",
    image: {
      url: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg",
    },
    date: new Date().toISOString(),
    link: "https://atlantm.by/uploads/userfiles/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.pdf",
    description: "Some description",
    file: {
      id: "80d47541-e186-481a-8add-a4a351e62b6d",
      mime: "application/zip",
      name: "D5rg88TvA1.zip",
      size: 1059388,
      url: "https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip",
    },
    json: '{"amplitudeEvent":{"name":"AppOpenedWithNotification","params":[{"param":"type","value":"pre-release"},{"param":"id","value":"26667"}]},"action":{"screen":"game","id":24719}}',
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
    id: 3,
    active: false,
    color: "rgba(222,111,123,0.8)",
    name: "Ivan",
    url: "https://banuba-catalog.dev.ozitag.com/interactive-background/golden-confetti",
    urlDisabled: true,
    content: "<p>simple header <em>Title</em></p>",
    image: {
      url: "https://cdn.atlantm.com/brands/logos/middle/brand-1.png",
    },
    date: new Date().toISOString(),
    link: "https://atlantm.by/uploads/userfiles/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.pdf",
    description: "Some description",
    file: {
      id: "80d47541-e186-481a-8add-a4a351e62b6d",
      mime: "application/zip",
      name: "D5rg88TvA1.zip",
      size: 1059388,
      url: "https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip",
    },
    json: '{"amplitudeEvent":{"name":"AppOpenedWithNotification","params":[{"param":"type","value":"pre-release"},{"param":"id","value":"26667"}]},"action":{"screen":"game","id":24719}}',
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
