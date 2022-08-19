import { ref, watch } from "vue";

import { brandOptions } from "../../msw/fixtures/brand-options";
import type { BaseOptionType } from "../../typings/common";

import FormFieldMultiSelect from "./FormFieldMultiSelect.vue";

export default { title: "FormFieldMultiSelect" };

const OPTIONS = brandOptions;

export const Default = () => ({
  name: "DefaultFormFieldMultiSelect",
  components: { FormFieldMultiSelect },
  setup() {
    const selectedOptions = ref<Array<BaseOptionType>>([]);
    const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log("selectedOptions:", selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `
    <FormFieldMultiSelect
      v-model:selected-options="selectedOptions"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
    />
  `,
});

export const WithSearch = () => ({
  name: "FormFieldMultiSelectWithSearch",
  components: { FormFieldMultiSelect },
  setup() {
    const selectedOptions = ref<Array<BaseOptionType>>([]);
    const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log("selectedOptions:", selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `
    <FormFieldMultiSelect 
      v-model:selected-options="selectedOptions"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
      :searchable="true"
    />
  `,
});
