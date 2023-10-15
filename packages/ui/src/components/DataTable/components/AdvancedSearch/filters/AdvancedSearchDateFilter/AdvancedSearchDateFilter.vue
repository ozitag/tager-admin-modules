<template>
  <div class="advanced-search-date-filter row-cols-3">
    <FormField
      :value="value.date"
      :label="`${labelDate}:`"
      name="dateFilter"
      type="date"
      :no-error-padding="true"
      @change="handleDateChange"
    />
    <FormField
      :value="value.dateFrom"
      :label="`${labelDateFrom}:`"
      name="dateFromFilter"
      type="date"
      :no-error-padding="true"
      @change="handleDateFromChange"
    />
    <FormField
      :value="value.dateTo"
      :label="`${labelDateTo}:`"
      name="dateToFilter"
      type="date"
      :no-error-padding="true"
      @change="handleDateToChange"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, ref, watch } from "vue";

import type { Nullable } from "@tager/admin-services";

import { FormField } from "../../../../../../main";
import { useAdvancedSearchLabels } from "../useAdvancedSearchDateFilter";

export type AdvancedSearchDateFilter = {
  date: Nullable<string>;
  dateFrom: Nullable<string>;
  dateTo: Nullable<string>;
};

export default defineComponent({
  name: "AdvancedSearchDateFilter",
  components: {
    FormField,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    filter: {
      type: Object as PropType<AdvancedSearchDateFilter>,
      required: true,
    },
  },
  emits: ["update:filter"],
  setup(props, { emit }) {
    const { labelDate, labelDateFrom, labelDateTo } = useAdvancedSearchLabels(
      props.label
    );

    const value = ref<AdvancedSearchDateFilter>(props.filter);

    const filterValue = computed(() => props.filter);
    watch(filterValue, () => {
      value.value = filterValue.value;
    });

    function handleDateChange(newValue: string) {
      value.value = {
        date: newValue,
        dateFrom: null,
        dateTo: null,
      };
    }

    function handleDateFromChange(newValue: string) {
      value.value = {
        date: null,
        dateFrom: newValue,
        dateTo:
          value.value.dateTo &&
          new Date(value.value.dateTo) < new Date(newValue)
            ? null
            : value.value.dateTo,
      };
    }

    function handleDateToChange(newValue: string) {
      value.value = {
        date: null,
        dateTo: newValue,
        dateFrom:
          value.value.dateFrom &&
          new Date(value.value.dateFrom) > new Date(newValue)
            ? null
            : value.value.dateFrom,
      };
    }

    watch(value, () => {
      emit("update:filter", value.value);
    });

    return {
      handleDateChange,
      handleDateFromChange,
      handleDateToChange,
      value,
      labelDate,
      labelDateFrom,
      labelDateTo,
    };
  },
});
</script>
<style scoped>
.advanced-search-date-filter:not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>
