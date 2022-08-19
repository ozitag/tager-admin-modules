import { defineComponent, ref } from "vue";

import type { BaseOptionType } from "../../typings/common";
import { brandOptions } from "../../msw/fixtures/brand-options";

import BaseSelect from "./BaseSelect.vue";

export default { title: "BaseSelect" };

const OPTIONS = brandOptions;

export const Default = () =>
  defineComponent({
    name: "DefaultBaseSelect",
    components: { BaseSelect },
    setup() {
      const selected = ref<BaseOptionType | null>(null);

      return {
        selected,
        options: OPTIONS,
      };
    },
    template: `
      <BaseSelect
        v-model:value="selected"
        :options="options"
      />
    `,
  });
