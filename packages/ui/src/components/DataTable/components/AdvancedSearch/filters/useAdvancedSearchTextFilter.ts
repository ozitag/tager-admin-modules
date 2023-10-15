import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import type { FilterTagType } from "@tager/admin-ui";
import { getFilterParamAsString } from "@tager/admin-ui";

import type { AdvancedSearchFilter } from "./types";

export function useAdvancedSearchTextFilter(
  queryParam: string,
  title: string
): AdvancedSearchFilter<string> {
  const route = useRoute();

  const initialFilter = computed<string>(
    () => getFilterParamAsString(route.query, queryParam) || ""
  );
  const filter = ref<string>(initialFilter.value);
  watch(initialFilter, () => {
    filter.value = initialFilter.value;
  });

  const tags = () =>
    filter.value
      ? [
          {
            value: filter.value,
            label: filter.value,
            name: queryParam,
            title,
          },
        ]
      : [];

  const filterParams = () => {
    return { [queryParam]: filter.value || "" };
  };

  const tagRemovalHandler = (event: FilterTagType) => {
    if (event.name === queryParam) filter.value = "";
  };

  return { filter, tags, filterParams, tagRemovalHandler };
}
