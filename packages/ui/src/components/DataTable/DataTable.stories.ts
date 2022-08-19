import { defineComponent, ref } from "vue";

import { request, type ResponseBody } from "@tager/admin-services";

import type { ColumnDefinition, FilterTagType } from "../../typings/common";

import { useDataTable } from "./DataTable.hooks";
import DataTable from "./DataTable.vue";
import AdvancedSearch from "./components/AdvancedSearch";

export default { title: "DataTable" };

const COLUMN_DEFS: Array<ColumnDefinition> = [
  {
    id: 1,
    name: "ID",
    field: "id",
    style: { minWidth: "50px", textAlign: "center" },
    headStyle: { minWidth: "50px", textAlign: "center" },
  },
  {
    id: 2,
    name: "Popular weight",
    field: "popularWeight",
    style: { minWidth: "128px" },
    headStyle: { minWidth: "128px" },
  },
  {
    id: 3,
    name: "Image",
    field: "image",
    type: "image",
    style: { minWidth: "100px" },
    headStyle: { minWidth: "100px" },
  },
  {
    id: 4,
    name: "Name",
    field: "name",
    type: "name",
    style: { minWidth: "260px" },
    headStyle: { minWidth: "260px" },
  },
  {
    id: 5,
    name: "Price",
    field: "price",
    style: { minWidth: "75px" },
    headStyle: { minWidth: "75px" },
    format: ({ row }) => `${row.price}$`,
  },
  {
    id: 6,
    name: "Category",
    field: "category",
    style: { minWidth: "200px" },
    headStyle: { minWidth: "200px" },
  },
  {
    id: 7,
    name: "Platforms",
    field: "platforms",
    style: { minWidth: "190px" },
    headStyle: { minWidth: "190px" },
  },
];

function getProductList(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<{ [key: string]: unknown }>>> {
  return request.get({ path: "/admin/products", params });
}

export const Default = () =>
  defineComponent({
    name: "DataTableDefault",
    components: { DataTable, AdvancedSearch },
    setup(props) {
      const {
        isLoading,
        rowData,
        errorMessage,
        searchQuery,
        handleChange,
        pageSize,
        pageNumber,
        pageCount,
      } = useDataTable({
        fetchEntityList: (params) =>
          getProductList({
            query: params.searchQuery,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
          }),
        initialValue: [],
        resourceName: "Product list",
        pageSize: 20,
      });

      const tags = ref<Array<FilterTagType>>([
        {
          value: "1",
          label: "France",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United States of America",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United Kingdom",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Belarus",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Russia",
          name: "company",
          title: "Производитель",
        },
        { value: "1", label: "Spain", name: "company", title: "Производитель" },
        {
          value: "1",
          label: "Austria",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Poland",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Germany",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "France",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United States of America",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United Kingdom",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Belarus",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Russia",
          name: "company",
          title: "Производитель",
        },
        { value: "1", label: "Spain", name: "company", title: "Производитель" },
        {
          value: "1",
          label: "Austria",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Poland",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Germany",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "France",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United States of America",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "United Kingdom",
          name: "company",
          title: "Производитель",
        },
        {
          value: "1",
          label: "Belarus",
          name: "company",
          title: "Производитель",
        },
      ]);

      return {
        isLoading,
        errorMessage,
        rowData,
        columnDefs: COLUMN_DEFS,
        searchQuery,
        handleChange,
        pageSize,
        pageNumber,
        pageCount,
        tags,
      };
    },
    template: `
      <div class="scrollContainer" style="overflow-Y: auto; height: 500px; padding: 1rem">
        <DataTable
          :column-defs="columnDefs"
          :row-data="rowData"
          :loading="isLoading"
          :error-message="errorMessage"
          :search-query="searchQuery"
          :pagination="{ pageSize, pageNumber, pageCount, disabled: isLoading }"
          @change="handleChange"
        >
          <template v-slot:filters>
            <AdvancedSearch :tags="tags">
              <div>filters content</div>
            </AdvancedSearch>
          </template>
          <template v-slot:cell(platforms)="{ row }">
            <ul v-if="row.platforms">
              <li v-for="platform of row.platforms" :key="platform">
                -&nbsp;{{ platform }}
              </li>
            </ul>
            <span v-else>-</span>
          </template>
        </DataTable>
      </div>
  `,
  });
