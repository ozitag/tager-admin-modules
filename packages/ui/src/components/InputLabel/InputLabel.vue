<template>
  <label :class="mainClass"><slot></slot></label>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

interface Props {
  forCheckbox: boolean;
}

export default defineComponent({
  name: "InputLabel",
  props: {
    forCheckbox: {
      type: Boolean,
    },
  },
  setup(props: Props) {
    const mainClass = computed(() =>
      props.forCheckbox ? "checkbox-label" : ""
    );

    return {
      mainClass,
    };
  },
});
</script>

<style scoped lang="scss">
label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.checkbox-label {
  margin-bottom: 0;
  user-select: none;
  padding-left: 1.25rem;
}
</style>
