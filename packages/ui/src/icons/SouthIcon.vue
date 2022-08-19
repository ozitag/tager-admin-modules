<template>
  <IconBase title="south" height="24" width="24" viewBox="0 0 24 24">
    <path
      d="M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"
    />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "SouthIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
