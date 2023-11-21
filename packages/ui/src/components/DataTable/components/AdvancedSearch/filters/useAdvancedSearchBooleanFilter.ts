import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { getFilterParamAsString } from "@tager/admin-ui";
import type { FilterTagType, AdvancedSearchFilterType } from "@tager/admin-ui";

export function useAdvancedSearchBooleanFilter(
  queryParam: string,
  title: string
): AdvancedSearchFilterType<boolean> {
  const route = useRoute();

  const initialFilter = computed<boolean>(
    () => getFilterParamAsString(route.query, queryParam) === "1"
  );
  const filter = ref<boolean>(initialFilter.value);
  watch(initialFilter, () => {
    filter.value = initialFilter.value;
  });

  const tags = () =>
    filter.value
      ? [
          {
            value: filter.value ? "1" : "0",
            label: "",
            name: queryParam,
            title,
          },
        ]
      : [];

  const filterParams = () => ({ [queryParam]: filter.value ? "1" : "" });

  const tagRemovalHandler = (event: FilterTagType) => {
    if (event.name === queryParam) filter.value = false;
  };

  return { value: filter, tags, filterParams, tagRemovalHandler };
}
