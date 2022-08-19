<template>
  <div class="form-group"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormGroup",
});
</script>

<style scoped>
.form-group {
  position: relative;
  display: block;
  margin-bottom: 1.5rem;
}
</style>
