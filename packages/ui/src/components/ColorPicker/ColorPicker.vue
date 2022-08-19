<template>
  <div ref="colorPickerContainerRef" data-ui-color-picker></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, type Ref, watch } from "vue";
import Picker from "vanilla-picker/csp";
import debounce from "lodash.debounce";
import "vanilla-picker/dist/vanilla-picker.csp.css";

export default defineComponent({
  name: "ColorPicker",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    const colorPickerContainerRef: Ref<HTMLDivElement | null> = ref(null);
    let picker: Picker | null = null;
    const currentValue = ref(props.value);

    function handleChange(hexColor: string) {
      context.emit("change", hexColor);
      context.emit("update:value", hexColor);
    }

    const debouncedChangeHandler = debounce(handleChange, 200);

    onMounted(() => {
      if (!colorPickerContainerRef.value) return;

      picker = new Picker({
        parent: colorPickerContainerRef.value,
        popup: false,
        color: currentValue.value,
      });
      picker.onChange = (color) => {
        currentValue.value = color.hex;
        debouncedChangeHandler(currentValue.value);
      };
      picker.show();
    });

    watch(
      () => props.value,
      () => {
        if (!picker || props.value === currentValue.value) return;

        picker.setColor(props.value, true);
      }
    );

    return { colorPickerContainerRef };
  },
});
</script>

<style>
[data-ui-color-picker] .picker_done {
  display: none;
}
</style>
