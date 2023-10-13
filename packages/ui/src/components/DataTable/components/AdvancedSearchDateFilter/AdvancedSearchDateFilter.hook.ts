import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";

import type { FilterTagType } from "@tager/admin-ui";
import { getFilterParamAsString } from "@tager/admin-ui";
import { isNotNullish, useI18n } from "@tager/admin-services";

import type { AdvancedSearchDateFilterType } from "./AdvancedSearchDateFilter.types";

export const useAdvancedSearchLabels = (label: string | null) => {
  const i18n = useI18n();

  const labelDate = label ?? i18n.t("ui:advancedSearchDateFilter.date");

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
}: Params = {}) => {
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

  const getDateFilterParams = () => {
    return {
      [queryParams.date]: dateFilter.value.date || "",
      [queryParams.dateFrom]: dateFilter.value.dateFrom || "",
      [queryParams.dateTo]: dateFilter.value.dateTo || "",
    };
  };

  const dateTagRemovalHandler = (event: FilterTagType): void => {
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

  const dateTags = () =>
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
    filter: dateFilter,
    getFilterParams: getDateFilterParams,
    tagRemovalHandler: dateTagRemovalHandler,
    tags: dateTags,
  };
};
