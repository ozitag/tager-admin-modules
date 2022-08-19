<template>
  <h4 class="page-title"><slot></slot></h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageTitle",
});
</script>

<style scoped lang="scss">
h4 {
  color: #000;
  letter-spacing: 0.1em;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
