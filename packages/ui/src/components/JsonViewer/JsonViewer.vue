<template>
  <div class="json-viewer">
    <JsonViewVue :value="value" boxed :expanded="true" expand-depth="2" />
    <div class="json-viewer__copy">
      <button
        v-if="!isCopied"
        class="json-viewer__copy-button"
        @click="handleCopy(JSON.stringify(value))"
      >
        Copy
      </button>
      <span v-if="isCopied" class="json-viewer__copy-text">Copied</span>
    </div>
  </div>
</template>

<script lang="ts">
import { JsonViewer as JsonViewVue } from "vue3-json-viewer";
import { defineComponent } from "vue";

import useCopyToClipboard from "../../hooks/useCopyToClipboard";

export default defineComponent({
  name: "JsonViewer",
  components: { JsonViewVue },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup: () => {
    const [isCopied, handleCopy] = useCopyToClipboard(2000);

    return {
      isCopied,
      handleCopy,
    };
  },
});
</script>

<style scoped lang="scss">
.json-viewer {
  position: relative;

  &__copy {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 0.75rem;
    cursor: pointer;
    z-index: 2;
    width: 50px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.3s all ease;
    opacity: 0;

    &-button {
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      transition: 0.3s all ease;
      background: #0d6efd;
      font-size: 0.75rem;
      display: block;

      &:hover {
        background: darken(#0d6efd, 5%);
      }
    }

    &-text {
      color: #0d6efd;
      display: block;
    }
  }

  &:hover {
    .json-viewer__copy {
      opacity: 1;
    }
  }
}
</style>
