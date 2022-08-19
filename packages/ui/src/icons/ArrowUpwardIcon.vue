<template>
  <IconBase title="arrow upward" height="24" width="24" viewBox="0 0 24 24">
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ArrowUpwardIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
