import { defineComponent, ref } from "vue";

import NumberInput from "./NumberInput.vue";

export default { title: "NumberInput" };

export const Float = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref("123123");

      return { value };
    },
    template: '<NumberInput v-model:value="value" type="float" />',
  });

export const Integer = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref("");

      return { value };
    },
    template: '<NumberInput v-model:value="value" type="integer" />',
  });

export const WithThousandsSeparator = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref("");

      return { value };
    },
    template:
      '<NumberInput v-model:value="value" thousands-separator=" " type="integer" />',
  });

export const Disabled = () => ({
  components: { NumberInput },
  template: "<NumberInput disabled />",
});
