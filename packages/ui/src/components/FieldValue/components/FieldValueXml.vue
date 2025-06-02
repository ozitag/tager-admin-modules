<template>
  <XmlViewer :xml="value" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XmlViewer from "vue3-xml-viewer";

export default defineComponent({
  name: "FieldValueXml",
  components: { XmlViewer },
  props: {
    value: {
      type: [String],
      default: "",
    },
  },
});
</script>
