import { ref, type Ref, watch } from "vue";
import { useRouter } from "vue-router";

import { getSearchParamByKey, updateSearchParam } from "../../utils/common";

const QUERY_PARAM = "query";

export function useSearch(): Ref<string> {
  const router = useRouter();
  const initialSearchQuery = getSearchParamByKey(QUERY_PARAM) ?? "";
  const searchQuery = ref(initialSearchQuery);

  watch(searchQuery, () => {
    updateSearchParam(router, QUERY_PARAM, searchQuery.value).catch(
      console.error
    );
  });

  return searchQuery;
}
