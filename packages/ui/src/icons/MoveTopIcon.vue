<template>
  <IconBase title="moveTop" height="24" width="24" viewBox="0 0 64 64">
    <polyline
      stroke-width="2"
      stroke-linejoin="bevel"
      stroke-miterlimit="10"
      stroke="currentColor"
      points="39,20 32,13, 25,20"
    />
    <polyline
      stroke-width="4"
      stroke="currentColor"
      stroke-miterlimit="10"
      points="32,59 32,47 32,13 "
    />
    <line
      stroke-width="3"
      stroke-miterlimit="10"
      stroke="currentColor"
      x1="0"
      y1="5"
      x2="64"
      y2="5"
    />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "MoveTopIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
