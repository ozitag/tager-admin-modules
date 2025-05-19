<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
    :no-error-padding="noErrorPadding"
    :description="description"
  >
    <div class="languages">
      <TabList
        v-model:tab-id="selectedTabId"
        :bordered="true"
        :tab-list="tabList"
        class="languages-tabs"
      />
    </div>
    <div
      v-for="option in languages"
      :key="option.code"
      :style="{ display: option.code === selectedTabId ? 'block' : 'none' }"
    >
      <BaseRichTextInput
        v-if="type === 'rich-text'"
        v-model:value="values[option.code]"
        :name="`${name}[${option.code}]`"
      />
      <BaseTextArea
        v-else-if="type === 'textarea'"
        v-model:value="values[option.code]"
        :name="`${name}[${option.code}]`"
      />
      <BaseInput
        v-else-if="type === 'string'"
        v-model:value="values[option.code]"
        :name="`${name}[${option.code}]`"
      />
    </div>
  </FormFieldWrapper>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, reactive, ref, watch } from "vue";

import BaseRichTextInput from "../BaseRichTextInput";
import BaseTextArea from "../BaseTextArea";
import FormFieldWrapper from "../FormFieldWrapper.vue";
import type { TabType } from "../TabList";
import { TabList } from "../TabList";
import BaseInput from "../BaseInput";

export default defineComponent({
  name: "FormFieldLocalizedInput",
  components: {
    BaseInput,
    TabList,
    FormFieldWrapper,
    BaseRichTextInput,
    BaseTextArea,
  },
  inheritAttrs: false,
  props: {
    languages: {
      type: Array as PropType<{ code: string; label: string }[]>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
    error: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
    noErrorPadding: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<"rich-text" | "textarea" | "string">,
      default: "textarea",
    },
  },
  emits: ["update:value"],
  setup: (props, { emit }) => {
    const values = reactive<Record<string, string>>({});

    const init = (src: Record<string, string>) => {
      props.languages.forEach((lang) => {
        values[lang.code] = src[lang.code] ?? "";
      });
    };
    init(props.value);

    watch(
      () => props.value,
      (newVal) => init(newVal),
      { deep: true }
    );

    watch(values, (newVals) => emit("update:value", { ...newVals }), {
      deep: true,
    });

    const tabList: Array<TabType> = props.languages.map((lang) => ({
      id: lang.code,
      label: lang.label,
    }));

    const selectedTabId = ref(tabList[0]?.id ?? null);

    return {
      tabList,
      selectedTabId,
      values,
    };
  },
});
</script>

<style scoped lang="scss">
.languages-tabs {
  margin-bottom: 10px;
}
</style>
