<template>
  <div ref="dataTableRef" class="data-table">
    <SearchInput
      v-show="useSearch"
      :value="searchQuery"
      @change="handleSearchChange"
    />

    <slot name="filters"></slot>

    <BaseTable
      :column-defs="columnDefs"
      :row-data="rowData"
      :row-css-class="rowCssClass"
      :row-no-hover="rowNoHover"
      :loading="loading"
      :error-message="errorMessage"
      :use-sticky-header="true"
      :enumerable="enumerable"
      :pagination="computedPagination"
    >
      <template v-for="(index, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </BaseTable>

    <div
      v-if="sort || displayPagination"
      ref="footerRef"
      class="data-table-footer"
    >
      <div ref="footerInnerRef" class="footer-inner">
        <SortComponent
          v-if="sort"
          :options="sort.options"
          :value="sort.options.find((item) => item.value === sort.value)"
          :disabled="loading"
          @change="handleSortChange"
        />
        <div v-if="displayPagination" class="pagination-container">
          <Pagination
            v-bind="computedPagination"
            @change:page-number="handlePageNumberChange"
            @change:page-size="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  type PropType,
  ref,
  watch,
} from "vue";

import type { Nullable } from "@tager/admin-services";

import BaseTable from "../BaseTable";
import SearchInput from "../SearchInput";
import Pagination from "../Pagination";
import type {
  ColumnDefinition,
  OptionType,
  RowDataDefaultType,
} from "../../typings/common";
import { getScrollableParent } from "../../utils/common";
import useResizeObserver from "../../hooks/useResizeObserver";

import type { TableChangeEvent } from "./DataTable.types";
import SortComponent from "./components/Sort/Sort.vue";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalCount?: number;
  usePageSize?: boolean;
}

interface SortProps {
  options: Array<OptionType>;
  value: string;
}

interface Props {
  columnDefs: Array<ColumnDefinition>;
  rowData: Array<RowDataDefaultType>;
  rowCssClass: (row: RowDataDefaultType) => string;
  loading: boolean;
  errorMessage: string | null;
  searchQuery: string;
  useSearch: boolean;
  pagination: PaginationProps;
  sort: Nullable<SortProps>;
  usePagination: boolean;
  enumerable: boolean;
}

export default defineComponent({
  name: "DataTable",
  components: {
    SortComponent,
    BaseTable,
    SearchInput,
    Pagination,
  },
  props: {
    columnDefs: {
      type: Array as PropType<Props["columnDefs"]>,
      required: true,
    },
    rowData: {
      type: Array as PropType<Props["rowData"]>,
      required: true,
    },
    rowCssClass: {
      type: Function as PropType<Props["rowCssClass"]>,
      default: null,
    },
    rowNoHover: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    searchQuery: {
      type: String,
      default: "",
    },
    pagination: {
      type: Object as PropType<Props["pagination"]>,
      default: null,
    },
    sort: {
      type: Object as PropType<Props["sort"]>,
      default: null,
    },
    useSearch: {
      type: Boolean,
      default: true,
    },
    usePagination: {
      type: Boolean,
      default: true,
    },
    enumerable: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "change",
    "change:search",
    "change:page-number",
    "change:page-size",
    "change:sort",
  ],
  setup(props: Props, context) {
    const dataTableRef = ref<HTMLElement | null>(null);
    const scrollContainerRef = ref<HTMLElement | null>(null);
    const footerRef = ref<HTMLElement | null>(null);
    const footerInnerRef = ref<HTMLElement | null>(null);

    function fixFooterPosition() {
      requestAnimationFrame(() => {
        if (footerRef.value && footerInnerRef.value) {
          const footerRect = footerRef.value.getBoundingClientRect();

          footerInnerRef.value.style.width = `${footerRect.width}px`;
          footerInnerRef.value.style.position = "fixed";
          footerInnerRef.value.style.bottom = "0";
          footerInnerRef.value.style.left = `${footerRect.left}px`;

          const footerInnerRect = footerInnerRef.value.getBoundingClientRect();

          footerRef.value.style.height = `${footerInnerRect.height}px`;
        }
      });
    }

    useResizeObserver<HTMLElement>(footerRef, () => {
      fixFooterPosition();
    });

    onMounted(() => {
      fixFooterPosition();
      scrollContainerRef.value = getScrollableParent(dataTableRef.value);
    });

    /** After data loading window inner width can be changed because of scrollbar */
    watch(() => props.rowData, fixFooterPosition);

    const computedPagination = computed<PaginationProps>(() => {
      const defaultPaginationProps: PaginationProps = {
        usePageSize: false,
        pageNumber: 1,
        pageSize: 100,
        pageCount: 0,
        totalCount: 0,
      };

      return { ...defaultPaginationProps, ...props.pagination };
    });

    function scrollToTop(): void {
      if (!scrollContainerRef.value) return;

      scrollContainerRef.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    watch(
      () => computedPagination.value.pageNumber,
      () => {
        scrollToTop();
      }
    );

    function dispatchChangeEvent(event: TableChangeEvent): void {
      context.emit("change", event);
    }

    function handleSearchChange(searchQuery: string): void {
      context.emit("change:search", searchQuery);
      dispatchChangeEvent({ type: "SEARCH_UPDATE", payload: searchQuery });
    }

    function handlePageNumberChange(pageNumber: number): void {
      context.emit("change:page-number", pageNumber);
      dispatchChangeEvent({ type: "PAGE_NUMBER_UPDATE", payload: pageNumber });
    }

    function handlePageSizeChange(pageSize: number): void {
      context.emit("change:page-size", pageSize);
      dispatchChangeEvent({ type: "PAGE_SIZE_UPDATE", payload: pageSize });
    }

    function handleSortChange(sort: string): void {
      context.emit("change:sort", sort);
      dispatchChangeEvent({ type: "SORT_UPDATE", payload: sort });
      scrollToTop();
    }

    const displayPagination = computed<boolean>(() => {
      return (
        props.usePagination &&
        props.pagination &&
        computedPagination.value.pageCount > 1
      );
    });

    return {
      handleSearchChange,
      handlePageNumberChange,
      handlePageSizeChange,
      handleSortChange,
      dataTableRef,
      footerRef,
      footerInnerRef,
      computedPagination,
      displayPagination,
    };
  },
});
</script>

<style scoped lang="scss">
.data-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.data-table-footer {
  overflow: hidden;

  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    background: #fff;
    font-size: 14px;
    min-height: 56px;
  }

  .pagination-container {
    display: flex;
    margin-left: auto;
    align-items: center;
    min-height: 55px;
  }
}
</style>
