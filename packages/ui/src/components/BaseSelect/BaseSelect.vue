<template>
  <ComboBox :searchable="searchable" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ComboBox from "../ComboBox";

export default defineComponent({
  name: "BaseSelect",
  components: { ComboBox },
  props: {
    searchable: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
