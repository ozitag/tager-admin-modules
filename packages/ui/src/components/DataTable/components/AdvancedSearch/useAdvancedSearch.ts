import type { Ref } from "vue";
import { computed, watch } from "vue";
import { isEqual, pick } from "lodash";
import { useRoute, useRouter } from "vue-router";

import type { FilterTagType } from "@tager/admin-ui";
import { getFilterParams } from "@tager/admin-ui";
import { isNotNullish } from "@tager/admin-services";

import type {
  AdvancedSearchFilterType,
  AdvancedSearchFilterParams,
} from "./AdvancedSearch.types";

type State = {
  filterParams: Ref<AdvancedSearchFilterParams>;
  tagRemovalHandler: (event: FilterTagType) => void;
  tags: Ref<FilterTagType[]>;
};

type Params = {
  filters: Array<AdvancedSearchFilterType<unknown>>;
  fetchEntityList: () => void;
};

export function useAdvancedSearch({ filters, fetchEntityList }: Params): State {
  const route = useRoute();
  const router = useRouter();

  const filterParams = computed(() => {
    return getFilterParams(
      filters.reduce(
        (filtersObject, filter) => ({
          ...filtersObject,
          ...filter.filterParams(),
        }),
        {}
      )
    );
  });

  const tagRemovalHandler = (event: FilterTagType): void =>
    filters.forEach((filter) => filter.tagRemovalHandler(event));

  const tags = computed<FilterTagType[]>(() =>
    filters
      .reduce(
        (filtersObject, filter) => [...filtersObject, ...filter.tags()],
        [] as FilterTagType[]
      )
      .filter(isNotNullish)
  );

  watch([filterParams], () => {
    const newQuery = {
      ...pick(route.query, ["query", "pageNumber", "sort"]),
      ...filterParams.value,
    };

    if (!isEqual(route.query, newQuery)) {
      router.replace({ query: newQuery });
    } else {
      fetchEntityList();
    }
  });

  return {
    filterParams,
    tags,
    tagRemovalHandler,
  };
}
