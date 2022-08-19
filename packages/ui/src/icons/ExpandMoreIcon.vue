<template>
  <IconBase title="expand more" height="24" width="24" viewBox="0 0 24 24">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ExpandMoreIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
