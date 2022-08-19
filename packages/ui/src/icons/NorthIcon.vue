<template>
  <IconBase title="north" height="24" width="24" viewBox="0 0 24 24">
    <path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "NorthIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
