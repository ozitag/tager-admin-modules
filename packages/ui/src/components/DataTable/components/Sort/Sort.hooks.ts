import { ref, type Ref, watch } from "vue";
import { useRouter } from "vue-router";

import { Nullable } from "@tager/admin-services";

import {
  getSearchParamByKey,
  updateSearchParam,
} from "../../../../utils/common";

const QUERY_PARAM = "sort";

export function useSort(defaultValue: Nullable<string>): Ref<Nullable<string>> {
  const router = useRouter();
  const initialSort = getSearchParamByKey(QUERY_PARAM) ?? defaultValue;
  const sort = ref(initialSort);

  watch(sort, () => {
    updateSearchParam(router, QUERY_PARAM, sort.value).catch(console.error);
  });

  return sort;
}
