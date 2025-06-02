<template>
  <pre><code class="hljs" v-html="highlightedXml"></code></pre>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import hljs from "highlight.js";

import "highlight.js/styles/github.css";

export default defineComponent({
  name: "XmlViewer",
  props: {
    xml: {
      type: [String],
      default: "",
    },
  },
  setup(props) {
    const highlightedXml = ref("");

    watch(
      () => props.xml,
      (newXml) => {
        try {
          highlightedXml.value = hljs.highlight(newXml, {
            language: "xml",
          }).value;
        } catch (e) {
          highlightedXml.value = `<span style="color:red;">Invalid XML</span>`;
        }
      },
      { immediate: true }
    );

    return {
      highlightedXml,
    };
  },
});
</script>

<style scoped>
pre {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f6f8fa;
  overflow: auto;
}
</style>
