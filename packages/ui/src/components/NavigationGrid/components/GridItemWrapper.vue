<template>
  <router-link v-if="url" :to="url" class="inner link">
    <slot></slot>
  </router-link>
  <div v-else class="inner">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GridItemWrapper",
  props: {
    url: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss">
.inner {
  display: block;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 100ms linear;
  background-color: #fff;
  border-radius: 4px;
  height: 100%;

  &.link {
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);

      :deep([data-ui-navigation-grid-item-top]) {
        border-color: #ccc;
      }
    }
  }
}
</style>
