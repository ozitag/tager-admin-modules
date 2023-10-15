import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";

import type { Nullable } from "@tager/admin-services";
import { isNotNullish, useI18n } from "@tager/admin-services";

import { getFilterParamAsString } from "../../../../../utils/common";
import type { FilterTagType } from "../../../../../typings/common";
import type { AdvancedSearchFilterType } from "../AdvancedSearch.types";

export type AdvancedSearchDateFilterType = {
  date: Nullable<string>;
  dateFrom: Nullable<string>;
  dateTo: Nullable<string>;
};

type Labels = {
  labelDate: string;
  labelDateFrom: string;
  labelDateTo: string;
};

export const useAdvancedSearchLabels = (label: string | null): Labels => {
  const i18n = useI18n();

  const labelDate = label ?? i18n.t("ui:advancedSearchDateFilter.Date") ?? "";

  const labelDateFrom =
    labelDate + " " + i18n.t("ui:advancedSearchDateFilter.from");

  const labelDateTo =
    labelDate + " " + i18n.t("ui:advancedSearchDateFilter.to");

  return {
    labelDate,
    labelDateFrom,
    labelDateTo,
  };
};

type Params = {
  label?: string | null;
  queryParams?: {
    date: string;
    dateFrom: string;
    dateTo: string;
  };
};

export const useAdvancedSearchDateFilter = ({
  label = null,
  queryParams = {
    date: "date",
    dateFrom: "date-from",
    dateTo: "date-to",
  },
}: Params = {}): AdvancedSearchFilterType<AdvancedSearchDateFilterType> => {
  const route = useRoute();

  const { labelDate, labelDateFrom, labelDateTo } =
    useAdvancedSearchLabels(label);

  const initialDateFilter = computed<AdvancedSearchDateFilterType>(() => {
    return {
      date: getFilterParamAsString(route.query, queryParams.date) ?? "",
      dateFrom: getFilterParamAsString(route.query, queryParams.dateFrom) ?? "",
      dateTo: getFilterParamAsString(route.query, queryParams.dateTo) ?? "",
    };
  });

  const dateFilter = ref<AdvancedSearchDateFilterType>(initialDateFilter.value);
  watch(initialDateFilter, () => {
    dateFilter.value = initialDateFilter.value;
  });

  const filterParams = () => ({
    [queryParams.date]: dateFilter.value.date || "",
    [queryParams.dateFrom]: dateFilter.value.dateFrom || "",
    [queryParams.dateTo]: dateFilter.value.dateTo || "",
  });

  const tagRemovalHandler = (event: FilterTagType): void => {
    if (event.name === queryParams.date) {
      dateFilter.value = {
        ...dateFilter.value,
        date: "",
      };
    } else if (event.name === queryParams.dateFrom) {
      dateFilter.value = {
        ...dateFilter.value,
        dateFrom: "",
      };
    } else if (event.name === queryParams.dateTo) {
      dateFilter.value = {
        ...dateFilter.value,
        dateTo: "",
      };
    }
  };

  const tags = () =>
    [
      dateFilter.value && dateFilter.value.date
        ? {
            value: dateFilter.value.date,
            label: dateFilter.value.date,
            name: queryParams.date,
            title: labelDate,
          }
        : null,
      dateFilter.value && dateFilter.value.dateFrom
        ? {
            value: dateFilter.value.dateFrom,
            label: dateFilter.value.dateFrom,
            name: queryParams.dateFrom,
            title: labelDateFrom,
          }
        : null,
      dateFilter.value && dateFilter.value.dateTo
        ? {
            value: dateFilter.value.dateTo,
            label: dateFilter.value.dateTo,
            name: queryParams.dateTo,
            title: labelDateTo,
          }
        : null,
    ].filter(isNotNullish);

  return {
    value: dateFilter,
    filterParams,
    tagRemovalHandler,
    tags,
  };
};
