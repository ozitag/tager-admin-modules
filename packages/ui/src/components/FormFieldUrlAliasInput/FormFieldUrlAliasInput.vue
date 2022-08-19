<template>
  <FormFieldWrapper
      :class="containerClass"
      :label="label"
      :label-for="id"
      :error="error"
  >
    <div class="field-inner">
      <span ref="measureTextRef" class="measure">{{ value }}</span>
      <small>{{ urlParts[0] }}</small>
      <BaseInput
          :id="id"
          :style="inputStyle"
          :value="value"
          v-bind="$attrs"
          class="alias-input"
      />
      <small>{{ urlParts[1] }}</small>
    </div>
  </FormFieldWrapper>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  type Ref,
  ref,
} from "vue";

import type {Nullable} from "@tager/admin-services";

import BaseInput from "../BaseInput";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  label: string;
  value: string;
  id: string;
  urlTemplate: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldUrlAliasInput",
  components: {
    FormFieldWrapper,
    BaseInput,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    urlTemplate: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const inputStyle = ref<{ width: string }>({width: "0px"});
    const measureTextRef: Ref<Nullable<HTMLSpanElement>> = ref(null);

    function updateInputWidth() {
      if (!measureTextRef.value) return;
      const newWidth = measureTextRef.value.offsetWidth;
      inputStyle.value = {width: newWidth + 2 + "px"};
    }

    const mutationObserver = new MutationObserver(() => {
      updateInputWidth();
    });


    onMounted(() => {
      if (!measureTextRef.value) return;

      mutationObserver.observe(measureTextRef.value, {
        childList: true
      });

      updateInputWidth();
    });

    onBeforeUnmount(() => {
      mutationObserver.disconnect();
    });

    const urlParts = computed<Array<string>>(() => {
      const templateVar = "{alias}";
      const index = props.urlTemplate.indexOf(templateVar);

      if (index === -1) return [props.urlTemplate];

      return [
        props.urlTemplate.slice(0, index),
        props.urlTemplate.slice(index + templateVar.length),
      ];
    });

    return {inputStyle, urlParts, measureTextRef};
  },
});
</script>

<style scoped lang="scss">
.field-inner {
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.measure {
  pointer-events: none;
  position: absolute;
  opacity: 0;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--input-border-color);
}

.alias-input {
  width: auto;
  min-width: 6rem;
  margin: 0 0.3rem;
}
</style>
