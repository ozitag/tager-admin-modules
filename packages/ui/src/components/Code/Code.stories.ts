import { defineComponent, ref } from "vue";

import BaseCode from "./Code.vue";

export default { title: "Code" };

export const Default = () =>
  defineComponent({
    components: { BaseCode },
    setup() {
      const value = ref<string>("");

      return {
        value,
      };
    },
    template: '<BaseCode v-model:value="value" />',
  });
