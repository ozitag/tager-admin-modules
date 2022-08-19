import { type Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { getSearchParamByKey, updateSearchParam } from "../../utils/common";

const PAGE_NUMBER_PARAM = "pageNumber";
const PAGE_SIZE_PARAM = "pageSize";

export function usePagination(params: { pageSize?: number | undefined }): {
  pageNumber: Ref<number>;
  pageSize: Ref<number>;
} {
  const router = useRouter();
  const initialPageNumber = Number(getSearchParamByKey(PAGE_NUMBER_PARAM) ?? 1);
  const initialPageSize = Number(
    getSearchParamByKey(PAGE_SIZE_PARAM) ?? params.pageSize ?? 100
  );

  const pageNumber = ref<number>(initialPageNumber);
  const pageSize = ref<number>(initialPageSize);

  watch(pageNumber, async () => {
    try {
      await updateSearchParam(router, PAGE_NUMBER_PARAM, pageNumber.value);
    } catch (error) {
      console.error(error);
    }
  });

  watch(pageSize, async () => {
    try {
      await updateSearchParam(router, PAGE_SIZE_PARAM, pageSize.value);
    } catch (error) {
      console.error(error);
    }
  });

  return { pageNumber, pageSize };
}
