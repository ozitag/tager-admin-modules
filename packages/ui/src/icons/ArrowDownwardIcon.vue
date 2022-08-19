<template>
  <IconBase title="arrow downward" height="24" width="24" viewBox="0 0 24 24">
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ArrowDownwardIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
