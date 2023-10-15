import type { Ref } from "vue";

import type { Nullable } from "@tager/admin-services";

import type { FilterTagType } from "../../../../../typings/common";

export type AdvancedSearchFilter<Type> = {
  filter: Ref<Type>;
  tags: () => Nullable<FilterTagType[]>;
  filterParams: () => Record<string, string>;
  tagRemovalHandler: (event: FilterTagType) => void;
};
