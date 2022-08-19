import { defineComponent, ref } from "vue";

import type { OptionType } from "../../typings/common";

import AjaxSelect from "./AjaxSelect.vue";

export default { title: "AjaxSelect" };

const url = "/admin/brands";

export const Default = () =>
  defineComponent({
    name: "DefaultAjaxSelect",
    components: { AjaxSelect },
    setup() {
      const selected = ref<OptionType<number> | null>(null);

      return {
        url,
        selected,
      };
    },
    template: `
      <AjaxSelect
          v-model:value="selected"
          :request-url="url"
          value-field="id"
          label-field="name"
      />
    `,
  });
