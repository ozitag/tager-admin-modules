<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <BaseInput
      v-if="type !== 'textarea'"
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      v-bind="$attrs"
    />

    <BaseTextArea
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      v-bind="$attrs"
    />

    <Progress :percent="percent" :color="color" />

    <div class="count">
      <span class="count-zero">0</span>

      <span v-if="min" class="count-lower-limit" :style="lowerLimitStyles">
        {{ min }}
      </span>

      <span v-if="max" class="count-upper-limit">{{ max }}</span>
    </div>
  </FormFieldWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import BaseInput from "../BaseInput";
import BaseTextArea from "../BaseTextArea";
import FormFieldWrapper from "../FormFieldWrapper.vue";

import Progress from "./components/Progress";

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
  max: number;
  min: number;
}

export default defineComponent({
  name: "FormFieldRecommendedLengthInput",
  components: {
    BaseInput,
    BaseTextArea,
    Progress,
    FormFieldWrapper,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return [
          "text",
          "number",
          "email",
          "password",
          "date",
          "time",
          "textarea",
        ].includes(value);
      },
    },
    error: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const isLowerThanMinLength = computed<boolean>(() => {
      return props.value.length < props.min;
    });

    const isHigherThanMaxLength = computed<boolean>(() => {
      return props.value.length > props.max;
    });

    const percent = computed<number>(() => {
      const currentLength: number = props.value.length;
      const recommendedLength = props.max ? props.max : props.min;
      return (currentLength / recommendedLength) * 100;
    });

    // TODO Refactor it. Maybe move this logic to Progress component
    const color = computed<string>(() => {
      if (isLowerThanMinLength.value) {
        return "orange";
      } else if (isHigherThanMaxLength.value) {
        return "red";
      }
      return "success";
    });

    const lowerLimitStyles = computed(() => {
      if (props.max) {
        return {
          left: `${(props.min / props.max) * 100}%`,
          transform: "translateX(-50%)",
        };
      }
      return { right: 0 };
    });

    return {
      percent,
      color,
      lowerLimitStyles,
    };
  },
});
</script>

<style scoped lang="scss">
.count {
  position: relative;
  height: 16px;
  font-size: 0.75rem;
}

.count-zero {
  position: absolute;
  top: 0;
  left: 0;
}

.count-lower-limit {
  position: absolute;
  top: 0;
}

.count-upper-limit {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
