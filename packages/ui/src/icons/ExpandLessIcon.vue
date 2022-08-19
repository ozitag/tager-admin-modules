<template>
  <IconBase title="expand less" height="24" width="24" viewBox="0 0 24 24">
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ExpandLessIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
