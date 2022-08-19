import type { FileType, Nullable } from "@tager/admin-services";

import type {
  ColumnDefinitionColor,
  ColumnDefinitionCommon,
  ColumnDefinitionDate,
  ColumnDefinitionFile,
  ColumnDefinitionHtml,
  ColumnDefinitionImage,
  ColumnDefinitionLink,
  ColumnDefinitionName,
} from "../../typings/common";

import BaseTable from "./BaseTable.vue";

export default { title: "BaseTable" };

const defaultColumnDefs = [
  {
    id: 100,
    name: "Name",
    type: "name",
    field: "name",
    style: { width: "40%" },
    format: ({ row }) => {
      return {
        adminLink: {
          url: "/admin/products/40",
          text: row.name,
          subtext: "3mL/R.8mR/L",
        },
        paramList: [
          { name: "Код товара", value: "691.725" },
          { name: "Штрих-код", value: "728360599674" },
        ],
        websiteLink: {
          url: row.url,
          text: row.url,
        },
      };
    },
    options: {
      shouldOpenNewTab: false,
      // shouldUseRouter: false,
    },
  } as ColumnDefinitionName<TestEntity>,
  {
    id: 1,
    name: "ID (10%)",
    field: "id",
    style: { width: "10%" },
  } as ColumnDefinitionCommon<TestEntity>,
  {
    id: 2,
    name: "String Color (30%)",
    field: "color",
    type: "color",
  } as ColumnDefinitionColor<TestEntity>,
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
  {
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
  } as ColumnDefinitionLink<TestEntity>,
  {
    id: 6,
    name: "File cell",
    field: "file",
    type: "file",
  } as ColumnDefinitionFile<TestEntity>,
];

interface TestEntity {
  id: number;
  name: string;
  url: string;
  color: string;
  content: string;
  image: { url: string };
  date: string;
  link: string;
  description: string;
  file: Nullable<FileType>;
}

const defaultRowData: Array<TestEntity> = [
  {
    id: 1,
    name: "Makeup Purple",
    url: "https://banuba-catalog.dev.ozitag.com/beautification/eyes-hazel",
    color: "#374635",
    content: "<p>simple header <h3>Title</h3></p>",
    image: {
      url: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg",
    },
    date: new Date().toISOString(),
    link: "/presets",
    description:
      "Some description Some description Some description Some description Some description Some description Some description Some description Some description Some description",
    file: {
      id: "80d47541-e186-481a-8add-a4a351e62b6d",
      mime: "application/zip",
      name: "D5rg88TvA1.zip",
      size: 1059388,
      url: "https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip",
    },
  },
  {
    id: 2,
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
  },
];

export const Default = () => ({
  components: { BaseTable },
  data() {
    return {
      columnDefs: defaultColumnDefs,
      rowData: defaultRowData,
    };
  },
  template: `
    <BaseTable :column-defs="columnDefs" :row-data="rowData" enumerable :loading="false" :use-sticky-header="false">
      <template v-slot:cell(description)="{ row, column }">
        <td :style="column.style">
          <h4>{{ row[column.field] }}</h4>
        </td>
      </template>
    </BaseTable>
  `,
});
