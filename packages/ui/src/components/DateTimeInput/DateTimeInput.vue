<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        title="Clear"
        @click="handleClearValue"
      >
        <RemoveCircleIcon />
      </BaseButton>
    </div>

    <div class="fields">
      <FormField
        :value="date"
        type="date"
        :label="$i18n.t('ui:dateTimeInput.date')"
        :name="addPrefix('date')"
        @input="handleChange('date', $event)"
      />
      <FormField
        :value="time"
        type="time"
        :label="$i18n.t('ui:dateTimeInput.time')"
        :name="addPrefix('time')"
        @input="handleChange('time', $event)"
      />

      <span>
        {{ $i18n.t("ui:dateTimeInput.result") }}: <em>{{ formattedResult }}</em>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import kebabCase from "lodash.kebabcase";

import { isNotFalsy, type Nullable } from "@tager/admin-services";

import FormField from "../FormField";
import { BaseButton } from "../BaseButton";
import RemoveCircleIcon from "../../icons/RemoveCircleIcon.vue";

type InnerDateTimeValue = {
  date: string;
  time: string;
};

type Props = {
  value: Nullable<string>;
  label: string;
};

export default defineComponent({
  name: "DateTimeInput",
  components: { FormField, BaseButton, RemoveCircleIcon },
  model: { prop: "value", event: "change" },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value", "change"],
  setup(props: Props, context) {
    const currentValue = computed<string>(() => props.value ?? "");

    function addLeadingZero(number: number): string {
      return number < 10 ? "0" + number : String(number);
    }

    function formatDateTime(inputValue: InnerDateTimeValue): string {
      const now = new Date();
      const fallbackDate = [
        now.getFullYear(),
        addLeadingZero(now.getMonth() + 1),
        addLeadingZero(now.getDate()),
      ].join("-");

      const fallbackTime = [
        addLeadingZero(now.getHours()),
        addLeadingZero(now.getMinutes()),
      ].join(":");

      return [
        inputValue.date || fallbackDate,
        inputValue.time || fallbackTime,
      ].join("T");
    }

    const parsedDateTime = computed<InnerDateTimeValue>(() => {
      const dateObject = new Date(currentValue.value);

      const isValid = !Number.isNaN(dateObject.valueOf());

      const [date, time] = currentValue.value.split("T");
      return { date: isValid ? date : "", time: isValid ? time : "" };
    });

    const date = computed<string>(() => parsedDateTime.value.date);
    const time = computed<string>(() => parsedDateTime.value.time);

    function addPrefix(field: string): string {
      const prefix = kebabCase(props.label);
      return [prefix, field].join("_");
    }

    function emitChangeEvent(value: string) {
      context.emit("change", value);
      context.emit("update:value", value);
    }

    function handleChange<FieldName extends keyof InnerDateTimeValue>(
      fieldName: FieldName,
      fieldValue: InnerDateTimeValue[FieldName]
    ) {
      const updatedDateTime: InnerDateTimeValue = {
        ...parsedDateTime.value,
        [fieldName]: fieldValue,
      };

      const formattedValue = formatDateTime(updatedDateTime);
      emitChangeEvent(formattedValue);
    }

    function handleClearValue() {
      emitChangeEvent("");
    }

    const formattedResult = computed<string>(() =>
      currentValue.value.split("T").filter(isNotFalsy).join(", ")
    );

    return {
      date,
      time,
      formattedResult,
      handleChange,
      handleClearValue,
      addPrefix,
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
  height: 38px;
}

.field-title {
  font-size: 1.2rem;
}

.fields {
  padding-left: 1rem;
  border-left: 1px solid var(--text-color);
}
</style>
