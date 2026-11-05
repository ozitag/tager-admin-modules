import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import BaseButton from "../BaseButton/BaseButton.vue";
import BaseInput from "../BaseInput/BaseInput.vue";

import CountInput from "./CountInput.vue";

export default {
  components: { BaseInput, BaseButton },
  title: "CountInput",
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      template: `
      <div :style="{width: '400px'}">
      <CountInput/>
      </div>
    `,
    }),
};

export const WithStep: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      template: `
      <CountInput :step="15"/>
    `,
    }),
};

export const WithMinMaxAndStep: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      template: `
      <CountInput :min="0" :max="90" :step="15"/>
    `,
    }),
};

export const WithLabelFormatter: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      template: `
      <CountInput :min="0" :max="90" :step="15" :label-formatter="value => (value ? value : 0) + ' мин.'"/>
    `,
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      template: `
      <CountInput :min="0" :max="90" :step="15" :value="30"/>
    `,
    }),
};

export const WithEventOnChange: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput },
      setup() {
        const value = ref<number>(0);

        const onChange = (newValue: number) => {
          console.log("trigger onChange");
          value.value = newValue;
        };

        return {
          value,
          onChange,
        };
      },
      template: `
      <CountInput :min="0" :max="90" :step="15" :value="value" @change="onChange"/>
    `,
    }),
};

export const WithVModel: StoryObj = {
  render: () =>
    defineComponent({
      components: { CountInput, BaseButton, BaseInput },
      setup() {
        const value = ref<number>(5);

        const reset = () => (value.value = 0);

        return {
          value,
          reset,
        };
      },
      template: `
      <div>
      <CountInput v-model:value="value"/>
      <br/>
      <BaseInput v-model:value="value"/>
      <br/>
      <BaseButton @click="reset">Reset</BaseButton>
      </div>
    `,
    }),
};
