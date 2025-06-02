<template>
  <JsonViewer :value="formattedValue" boxed :expanded="true" expand-depth="2" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import type { Nullable } from "@tager/admin-services";

import JsonViewer from "../../JsonViewer";

export default defineComponent({
  name: "FieldValueJson",
  components: { JsonViewer },
  props: {
    data: {
      type: [String, Object],
      default: "",
    },
  },
  setup(props) {
    const formattedValue = computed<Nullable<Record<any, any>>>(() => {
      if (props.data) {
        if (typeof props.data === "string") {
          return JSON.parse(props.data);
        } else {
          return props.data;
        }
      }

      return null;
    });

    return {
      formattedValue,
    };
  },
});
</script>
