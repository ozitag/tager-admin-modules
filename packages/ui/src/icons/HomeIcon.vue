<template>
  <IconBase title="home" height="24" width="24" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "HomeIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
