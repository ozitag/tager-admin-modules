<template>
  <IconBase title="view list" height="24" width="24" viewBox="0 0 24 24">
    <path
      d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"
    />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconBase from "../components/IconBase";

export default defineComponent({
  name: "ViewListIcon",
  components: { IconBase },
});
</script>

<style scoped></style>
