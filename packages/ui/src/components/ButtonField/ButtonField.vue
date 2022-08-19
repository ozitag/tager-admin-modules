<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        :title="$i18n.t('ui:buttonField.remove')"
        @click="handleRemoveValue"
      >
        <RemoveCircleIcon />
      </BaseButton>
      <BaseButton
        v-else
        variant="icon"
        :title="$i18n.t('ui:buttonField.add')"
        @click="handleAddValue"
      >
        <AddCircleIcon />
      </BaseButton>
    </div>

    <div v-if="value" class="fields">
      <FormField
        :label="$i18n.t('ui:buttonField.label')"
        :name="addPrefix('label')"
        :value="value.label"
        @update:value="handleChange('label', $event)"
      />
      <FormField
        :label="$i18n.t('ui:buttonField.link')"
        :name="addPrefix('link')"
        :value="value.link"
        @update:value="handleChange('link', $event)"
      />
      <FormFieldCheckbox
        :label="$i18n.t('ui:buttonField.isNewTab')"
        :name="addPrefix('isNewTab')"
        :checked="value.isNewTab"
        @update:checked="handleChange('isNewTab', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import kebabCase from "lodash.kebabcase";

import { BaseButton } from "../BaseButton";
import FormField from "../FormField";
import FormFieldCheckbox from "../FormFieldCheckbox";
import RemoveCircleIcon from "../../icons/RemoveCircleIcon.vue";
import AddCircleIcon from "../../icons/AddCircleIcon.vue";

import {
  ButtonFieldValueSchema,
  type ButtonFieldValueType,
} from "./ButtonField.helpers";

type NonNullableButtonFieldValueType = NonNullable<ButtonFieldValueType>;

const INITIAL_VALUE: NonNullableButtonFieldValueType = {
  label: "",
  link: "",
  isNewTab: false,
};

type Props = {
  value: ButtonFieldValueType;
  label: string;
};

export default defineComponent({
  name: "ButtonField",
  components: {
    FormField,
    FormFieldCheckbox,
    BaseButton,
    RemoveCircleIcon,
    AddCircleIcon,
  },
  props: {
    value: {
      type: Object as PropType<ButtonFieldValueType>,
      default: null,
      validator(value: unknown): boolean {
        return ButtonFieldValueSchema.safeParse(value).success;
      },
    },
    label: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props: Props, context) {
    function emitUpdateEvent(value: ButtonFieldValueType) {
      context.emit("update:value", value);
    }

    function handleChange<
      FieldName extends keyof NonNullableButtonFieldValueType
    >(
      fieldName: FieldName,
      fieldValue: NonNullableButtonFieldValueType[FieldName]
    ) {
      const currentValue = props.value ?? INITIAL_VALUE;

      const updatedValue = {
        ...currentValue,
        [fieldName]: fieldValue,
      };

      emitUpdateEvent(updatedValue);
    }

    function addPrefix(field: string): string {
      const prefix = kebabCase(props.label);
      return [prefix, field].join("_");
    }

    function handleRemoveValue() {
      emitUpdateEvent(null);
    }

    function handleAddValue() {
      emitUpdateEvent({ ...INITIAL_VALUE });
    }

    return {
      addPrefix,
      handleChange,
      handleRemoveValue,
      handleAddValue,
    };
  },
});
</script>

<style scoped>
.button-field-container {
  margin-bottom: 1rem;
}

.title-row {
  display: inline-flex;
  align-items: center;
}

.field-title {
  font-size: 1.2rem;
}
.fields {
  padding-left: 1rem;
  border-left: 1px solid var(--text-color);
}
</style>
