<template>
  <IconBase title="add circle" height="24" width="24" viewBox="0 0 24 24">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
    />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "AddCircleIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
