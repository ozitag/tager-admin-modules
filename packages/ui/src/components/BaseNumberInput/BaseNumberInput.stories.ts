import { defineComponent, ref } from "vue";

import BaseNumberInput from "./BaseNumberInput.vue";

export default { title: "BaseNumberInput" };

export const Float = () =>
  defineComponent({
    components: { BaseNumberInput },
    setup() {
      const value = ref("123123");

      return { value };
    },
    template: '<BaseNumberInput v-model:value="value" type="float" />',
  });

export const Integer = () =>
  defineComponent({
    components: { BaseNumberInput },
    setup() {
      const value = ref(null);

      return { value };
    },
    template: '<BaseNumberInput v-model:value="value" type="integer" />',
  });

export const WithThousandsSeparator = () =>
  defineComponent({
    components: { BaseNumberInput },
    setup() {
      const value = ref("");

      return { value };
    },
    template:
      '<BaseNumberInput v-model:value="value" thousands-separator=" " type="integer" />',
  });

export const Disabled = () => ({
  components: { BaseNumberInput },
  template: "<BaseNumberInput disabled />",
});
