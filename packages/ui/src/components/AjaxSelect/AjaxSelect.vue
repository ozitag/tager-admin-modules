<template>
  <ComboBox
    :options="options"
    :loading="loading"
    :filterable="false"
    :no-options-message="noOptionsMessage"
    v-bind="$attrs"
    @change:query="handleSearchQueryChange"
  />
</template>

<script lang="ts">
import get from "lodash.get";
import { defineComponent } from "vue";

import {
  isAbsoluteUrl,
  isNullish,
  request,
  type ResponseBody,
} from "@tager/admin-services";

import type { OptionType } from "../../typings/common";
import ComboBox, { useSelectOptionsResource } from "../ComboBox";

interface Props {
  requestUrl: string;
  valueField: string;
  labelField: string;
}

interface EntityType {
  [key: string]: unknown;
}

export default defineComponent({
  name: "AjaxSelect",
  components: { ComboBox },
  props: {
    requestUrl: {
      type: String,
      required: true,
    },
    valueField: {
      type: String,
      default: "value",
    },
    labelField: {
      type: String,
      default: "label",
    },
  },
  setup(props: Props) {
    function fetchEntityList(params?: {
      query?: string;
    }): Promise<ResponseBody<Array<EntityType>>> {
      return request.get(
        isAbsoluteUrl(props.requestUrl)
          ? { absoluteUrl: props.requestUrl, params }
          : { path: props.requestUrl, params }
      );
    }

    const { loading, options, noOptionsMessage, handleSearchQueryChange } =
      useSelectOptionsResource<EntityType, OptionType<number | string>>({
        fetchEntityList,
        resourceName: "Option list",
        minQueryLength: 3,
        convertEntityToOption: (entity) => {
          const value = get(entity, props.valueField, null);
          return {
            value: value as number | string,
            label: (isNullish(value)
              ? "Invalid option"
              : get(entity, props.labelField, "Unknown option")) as string,
          };
        },
      });

    return {
      loading,
      options,
      noOptionsMessage,
      handleSearchQueryChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
