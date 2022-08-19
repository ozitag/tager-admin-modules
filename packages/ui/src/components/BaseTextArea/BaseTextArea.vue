<template>
  <textarea
    ref="textareaRef"
    :autocomplete="autocomplete"
    :rows="rows"
    :value="value"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  type Ref,
  ref,
} from "vue";
import autosize from "autosize";

interface Props {
  value: string;
  autosize: boolean;
  rows: number;
  autocomplete: string;
}

export default defineComponent({
  name: "BaseTextArea",
  props: {
    value: {
      type: String,
      default: "",
    },
    autosize: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Number,
      default: 3,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
  },
  emits: ["input", "update:value", "change"],
  setup(props: Props, context) {
    const textareaRef: Ref<HTMLTextAreaElement | null> = ref(null);

    function getInputValueFromEvent(event: Event): string {
      return (event.target as HTMLInputElement).value;
    }

    function handleInput(event: Event) {
      const value = getInputValueFromEvent(event);
      context.emit("input", value);
      context.emit("update:value", value);
    }

    function handleChange(event: Event) {
      context.emit("change", getInputValueFromEvent(event));
    }

    onMounted(() => {
      if (props.autosize && textareaRef.value) {
        autosize(textareaRef.value);
      }
    });

    onUpdated(() => {
      /**
       * We should update autosize in case when textarea becomes visible
       * When textarea is hidden, element's `scrollHeight` equals to 0 and `resize` doesn't work.
       * We can't watch some prop, because nothing changes except style `display: none -> block`
       */
      if (props.autosize && textareaRef.value) {
        autosize.update(textareaRef.value);
      }
    });

    onUnmounted(() => {
      if (props.autosize && textareaRef.value) {
        autosize.destroy(textareaRef.value);
      }
    });

    return { textareaRef, handleInput, handleChange };
  },
});
</script>

<style scoped lang="scss">
textarea {
  display: block;
  width: 100%;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: auto;
  resize: vertical;

  // Placeholder
  &::placeholder {
    color: var(--input-placeholder-color);
    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
    opacity: 1;
  }

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &:disabled,
  &[readonly] {
    background-color: var(--input-disabled-bg);
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  }

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
  }
}
</style>
