import { defineComponent } from "vue";
//import type { Story } from "@storybook/vue3";

import BaseMinMax from "./BaseMinMax.vue";

export default { title: "BaseMinmax" };

export const Default = () =>
  defineComponent({
    components: { BaseMinMax },
    template: `
      <BaseMinMax/>`,
  });

export const Disabled = () => ({
  components: { BaseMinMax },
  template: '<BaseMinMax :value="{min: 0, max: 10000}" :disabled="true" />',
});
