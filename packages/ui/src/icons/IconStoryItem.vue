<template>
  <div class="container">
    <slot></slot>
    <code>{{ title }}</code>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconStoryItem",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 180px;
  padding: 12px;
  overflow: hidden;
}

code {
  display: inline-block;
  max-width: 100%;
  margin-top: 8px;
  overflow: hidden;
  color: #333;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
