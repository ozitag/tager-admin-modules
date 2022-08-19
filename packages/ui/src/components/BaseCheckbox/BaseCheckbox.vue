<template>
  <input
    ref="checkboxRef"
    type="checkbox"
    value="value"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, type Ref, ref, watchEffect } from "vue";

interface Props {
  checked: boolean;
}

export default defineComponent({
  name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change", "update:checked"],
  setup(props: Props, context) {
    const checkboxRef: Ref<HTMLInputElement | null> = ref(null);

    function updateCheckedInDOM() {
      /** Issue: https://github.com/vuejs/vue/issues/3523 */
      if (checkboxRef.value) {
        checkboxRef.value.checked = props.checked;
      }
    }

    function handleChange(event: Event) {
      const checked = (event.target as HTMLInputElement).checked;
      updateCheckedInDOM();
      context.emit("change", checked, event);
      context.emit("update:checked", checked);
    }

    watchEffect(updateCheckedInDOM);

    return {
      checkboxRef,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.25rem;
  -webkit-appearance: checkbox;
}
</style>
