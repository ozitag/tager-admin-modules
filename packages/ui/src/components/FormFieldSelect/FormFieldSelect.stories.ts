import { ref, watch } from "vue";

import { brandOptions } from "../../msw/fixtures/brand-options";
import type { BaseOptionType } from "../../typings/common";

import FormFieldSelect from "./FormFieldSelect.vue";

export default { title: "FormFieldSelect" };

const OPTIONS = brandOptions;

export const Default = () => ({
  name: "DefaultFormFieldSelect",
  components: { FormFieldSelect },
  setup() {
    const selected = ref<BaseOptionType | null>(null);
    const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);

    watch(selected, (selected) => {
      console.log("selected:", selected);
    });

    return {
      selected,
      options,
    };
  },
  template: `
    <FormFieldSelect
      v-model:value="selected"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
      no-options-message="No options"
    />
  `,
});
