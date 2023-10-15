import type { Ref } from "vue";

import type { FilterTagType } from "../../../../typings/common";

export type AdvancedSearchFilterParams = Record<string, string | string[]>;

export type AdvancedSearchFilterType<Type> = {
  value: Ref<Type>;
  filterParams: () => AdvancedSearchFilterParams;
  tags: () => FilterTagType[];
  tagRemovalHandler: (event: FilterTagType) => void;
};
