import type { Ref } from "vue";

import type { FilterTagType } from "../../../../../typings/common";

export type AdvancedSearchFilter<Type> = {
  filter: Ref<Type>;
  tags: () => FilterTagType[];
  filterParams: () => Record<string, string>;
  tagRemovalHandler: (event: FilterTagType) => void;
};
