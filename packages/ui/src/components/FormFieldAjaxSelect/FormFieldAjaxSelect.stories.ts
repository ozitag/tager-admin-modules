import { ref, watch } from "vue";

import type { OptionType } from "../../typings/common";

import FormFieldAjaxSelect from "./FormFieldAjaxSelect.vue";

export default { title: "FormFieldAjaxSelect" };

const DEFAULT_VALUE: OptionType<number> = {
  value: 20293,
  label: "ID 20239: Minecraft",
};

export const Default = () => ({
  name: "DefaultFormFieldAjaxSelect",
  components: { FormFieldAjaxSelect },
  setup() {
    const selected = ref<OptionType<number> | null>(DEFAULT_VALUE);

    watch(selected, () => {
      console.log(selected.value);
    });

    return {
      selected,
    };
  },
  template: `
    <FormFieldAjaxSelect
      v-model:value="selected"
      request-url="http://localhost:7001/api/admin/games/ajax-search"
      value-field="value"
      label-field="label"
      name="games"
      label="Games"
      error="Please, select game"
    />
  `,
});
