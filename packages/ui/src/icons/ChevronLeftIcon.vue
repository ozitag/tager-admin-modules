<template>
  <IconBase title="chevron left" height="24" width="24" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ChevronLeftIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
