<template>
  <JsonViewer
    :value="JSON.parse(data)"
    boxed
    :expanded="true"
    expand-depth="2"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";

export default defineComponent({
  name: "FieldValueJson",
  components: { JsonViewer },
  props: {
    data: {
      type: String,
      default: "",
    },
  },
});
</script>
