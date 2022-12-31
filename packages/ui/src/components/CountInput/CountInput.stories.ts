import { defineComponent, ref } from "vue";

import BaseButton from "../BaseButton/BaseButton.vue";
import BaseInput from "../BaseInput/BaseInput.vue";

import CountInput from "./CountInput.vue";

export default {
  components: { BaseInput, BaseButton },
  title: "CountInput",
};

export const Default = () =>
  defineComponent({
    components: { CountInput },
    template: `
      <CountInput/>
    `,
  });

export const WithStep = () =>
  defineComponent({
    components: { CountInput },
    template: `
      <CountInput :step="15"/>
    `,
  });

export const WithMinMaxAndStep = () =>
  defineComponent({
    components: { CountInput },
    template: `
      <CountInput :min="0" :max="90" :step="15"/>
    `,
  });

export const WithLabelFormatter = () =>
  defineComponent({
    components: { CountInput },
    template: `
      <CountInput :min="0" :max="90" :step="15" :label-formatter="value => (value ? value : 0) + ' мин.'"/>
    `,
  });

export const WithDefaultValue = () =>
  defineComponent({
    components: { CountInput },
    template: `
      <CountInput :min="0" :max="90" :step="15" :value="30"/>
    `,
  });

export const WithEventOnChange = () =>
  defineComponent({
    components: { CountInput },
    setup() {
      const value = ref<number>(0);

      const onChange = (newValue) => {
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
  });

export const WithVModel = () =>
  defineComponent({
    components: { CountInput, BaseButton, BaseInput },
    setup() {
      const value = ref<number>(0);

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
  });
