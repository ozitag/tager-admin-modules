import { computed, type ComputedRef, onMounted, type Ref, watch } from "vue";

import type { ResponseBody } from "@tager/admin-services";
import {
  type Nullable,
  type PaginationMeta,
  useResource,
} from "@tager/admin-services";

import { useSearch } from "../SearchInput";
import { usePagination } from "../Pagination";

import type { TableChangeEvent } from "./DataTable.types";

interface TableDataRequestParams {
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
}

interface TableState<T> {
  meta: Ref<PaginationMeta | undefined>;
  isLoading: ComputedRef<boolean>;
  rowData: Ref<Array<T>>;
  errorMessage: Ref<Nullable<string>>;
  searchQuery: Ref<string>;
  pageNumber: Ref<number>;
  pageSize: Ref<number>;
  pageCount: ComputedRef<number>;
  handleChange: (event: TableChangeEvent) => void;
  fetchEntityList: () => Promise<void>;
}

export function useDataTable<T>(params: {
  fetchEntityList: (
    requestParams: TableDataRequestParams
  ) => Promise<ResponseBody<Array<T>>>;
  initialValue?: Array<T>;
  resourceName?: string;
  pageSize?: number;
}): TableState<T> {
  const searchQuery = useSearch();
  const { pageNumber, pageSize } = usePagination({
    pageSize: params.pageSize,
  });

  const [
    fetchEntityList,
    { loading: isLoading, data: rowData, error: errorMessage, meta },
  ] = useResource<Array<T>, PaginationMeta>({
    fetchResource: () =>
      params.fetchEntityList({
        searchQuery: searchQuery.value,
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
      }),
    initialValue: params.initialValue ?? [],
    resourceName: params.resourceName,
  });

  const pageCount = computed<number>(() => meta.value?.page.count ?? 0);

  onMounted(() => {
    fetchEntityList();
  });

  watch([searchQuery, pageNumber, pageSize], () => {
    fetchEntityList();
  });

  function handleChange(event: TableChangeEvent): void {
    switch (event.type) {
      case "SEARCH_UPDATE":
        searchQuery.value = event.payload;
        pageNumber.value = 1;
        break;
      case "PAGE_NUMBER_UPDATE":
        pageNumber.value = event.payload;
        break;
      case "PAGE_SIZE_UPDATE":
        pageSize.value = event.payload;
        pageNumber.value = 1;
        break;
    }
  }

  return {
    meta,
    isLoading,
    rowData,
    errorMessage,
    searchQuery,
    pageNumber,
    pageSize,
    pageCount,
    handleChange,
    fetchEntityList,
  };
}
