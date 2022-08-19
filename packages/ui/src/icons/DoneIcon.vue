<template>
  <IconBase title="done" height="24" width="24" viewBox="0 0 24 24">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "DoneIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
