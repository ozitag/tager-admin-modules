import type { Ref } from "vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import type {
  OptionType,
  FilterTagType,
  BaseOptionValue,
} from "@tager/admin-ui";
import { getFilterParamAsString } from "@tager/admin-ui";
import type { Nullable } from "@tager/admin-services";

import type { AdvancedSearchFilter } from "./types";

type State<Type extends BaseOptionValue = string> = AdvancedSearchFilter<
  Nullable<OptionType<Type>>
>;

export function useAdvancedSearchSingleOptionFilter<
  Type extends BaseOptionValue = string
>(
  queryParam: string,
  title: string,
  options: Array<OptionType<Type>>
): State<Type> {
  const route = useRoute();

  const initialFilter = computed<Nullable<OptionType<Type>>>(
    () =>
      options.find(
        (item) =>
          item.value ===
          (getFilterParamAsString(route.query, queryParam) as BaseOptionValue)
      ) || null
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const filter: Ref<Nullable<OptionType<Type>>> = ref<
    Nullable<OptionType<Type>>
  >(initialFilter.value);

  watch(filter, () => {
    filter.value = initialFilter.value;
  });

  const tags = () =>
    filter.value && filter.value.value
      ? [
          {
            value: String(filter.value?.value) || "",
            label: filter.value?.label || "",
            name: queryParam,
            title,
          },
        ]
      : [];

  const filterParams = () => {
    return { [queryParam]: String(filter.value?.value) || "" };
  };

  const tagRemovalHandler = (event: FilterTagType) => {
    if (event.name === queryParam) filter.value = null;
  };

  return {
    filter,
    tags,
    filterParams,
    tagRemovalHandler,
  };
}
