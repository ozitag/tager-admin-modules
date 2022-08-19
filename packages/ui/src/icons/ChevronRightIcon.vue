<template>
  <IconBase title="chevron right" height="24" width="24" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ChevronRightIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
