<template>
  <div v-if="shortCodeOptionList.length > 0" class="container">
    <button
      class="title-button"
      :title="
        isOpen
          ? $i18n.t('ui:shortCodeConstructor.hide')
          : $i18n.t('ui:shortCodeConstructor.open')
      "
      type="button"
      @click="toggleOpen"
    >
      <span>{{ computedLabel }}</span>
      <span class="icon-container">
        <ExpandLessIcon v-if="isOpen" />
        <ExpandMoreIcon v-else />
      </span>
    </button>

    <div v-show="isOpen" class="fields">
      <div class="result">
        <span class="code">{{ result }}</span>
        <BaseButton
          variant="icon"
          :title="$i18n.t('ui:shortCodeConstructor.copy')"
          @click="copyShortCode"
        >
          <ContentCopyIcon />
        </BaseButton>
      </div>

      <FormFieldSelect
        v-model:value="selectedShortCode"
        name="shortCode"
        :label="$i18n.t('ui:shortCodeConstructor.type')"
        :options="shortCodeOptionList"
      />

      <FormField
        v-for="field of fields"
        :key="field.name"
        v-model:value="values[field.name]"
        :label="field.label"
        :name="field.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref, watch } from "vue";

import { type Nullable, useI18n } from "@tager/admin-services";

import type {
  OptionType,
  ShortCodeItemType,
  ShortCodeParamType,
} from "../../typings/common";
import { BaseButton } from "../BaseButton";
import FormField from "../FormField";
import FormFieldSelect from "../FormFieldSelect";
import ExpandMoreIcon from "../../icons/ExpandMoreIcon.vue";
import ExpandLessIcon from "../../icons/ExpandLessIcon.vue";
import ContentCopyIcon from "../../icons/ContentCopyIcon.vue";

function getShortCodeLabel(shortCode: string): string {
  return shortCode.slice(0, 1).toUpperCase() + shortCode.slice(1);
}

function getInitialFieldValues(
  fields: Array<ShortCodeParamType>
): Record<string, string> {
  return fields.reduce<Record<string, string>>((values, field) => {
    values[field.name] = "";
    return values;
  }, {});
}

type Props = {
  shortCodeConfigList: Array<ShortCodeItemType>;
  label: string;
};

export default defineComponent({
  name: "ShortCodeConstructor",
  components: {
    BaseButton,
    FormField,
    FormFieldSelect,
    ContentCopyIcon,
    ExpandLessIcon,
    ExpandMoreIcon,
  },
  props: {
    shortCodeConfigList: {
      type: Array as PropType<Array<ShortCodeItemType>>,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const i18n = useI18n();
    const isOpen = ref<boolean>(false);

    function toggleOpen() {
      isOpen.value = !isOpen.value;
    }

    const shortCodeOptionList = computed<Array<OptionType>>(() =>
      props.shortCodeConfigList.map((config) => ({
        value: config.name,
        label: getShortCodeLabel(config.name),
      }))
    );

    const selectedShortCode = ref<Nullable<OptionType>>(
      shortCodeOptionList.value[0] ?? null
    );

    watch([shortCodeOptionList, selectedShortCode], () => {
      if (shortCodeOptionList.value.length > 0 && !selectedShortCode.value) {
        selectedShortCode.value = shortCodeOptionList.value[0];
      }
    });

    const fields = computed<Array<ShortCodeParamType>>(() => {
      const foundConfig = props.shortCodeConfigList.find(
        (config) => config.name === selectedShortCode.value?.value
      );

      return foundConfig ? foundConfig.params : [];
    });

    const values = ref<Record<string, string>>(
      getInitialFieldValues(fields.value)
    );

    watch(fields, () => {
      values.value = getInitialFieldValues(fields.value);
    });

    const result = computed<string>(() => {
      if (!selectedShortCode.value) return "";

      const attrs = Object.keys(values.value)
        .map((fieldName) => `${fieldName}="${values.value[fieldName]}"`)
        .join(" ");

      return `[${selectedShortCode.value.value} ${attrs}]`;
    });

    function copyShortCode() {
      navigator.clipboard.writeText(result.value).catch(console.error);
    }

    const computedLabel = computed(() => {
      if (props.label) {
        return props.label;
      }
      return i18n.t("ui:shortCodeConstructor.shortcode");
    });

    return {
      computedLabel,
      shortCodeOptionList,
      selectedShortCode,
      fields,
      values,
      copyShortCode,
      result,
      isOpen,
      toggleOpen,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin-bottom: 1rem;
}

.title-button {
  color: inherit;
  display: inline-flex;
  align-items: center;
}

.title {
  font-size: 1.2rem;
}

.result {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.code {
  margin-right: 1rem;
}

.icon-container {
  padding: 0.375rem;
  border-radius: 50%;
  color: var(--secondary);

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  svg {
    display: block;
    fill: currentColor;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
}

.fields {
  padding-left: 1rem;
  border-left: 1px solid var(--text-color);
}
</style>
