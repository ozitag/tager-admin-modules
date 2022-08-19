import { ref } from "vue";

import type { BaseOptionType } from "../../typings/common";
import { brandOptions } from "../../msw/fixtures/brand-options";

import FormFieldComboBox from "./FormFieldComboBox.vue";

export default { title: "FormFieldComboBox" };

const OPTIONS = brandOptions;

export const Default = () => ({
  name: "DefaultFormFieldComboBox",
  components: { FormFieldComboBox },
  setup() {
    const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);
    const selected = ref<BaseOptionType | null>(null);

    return {
      options,
      selected,
    };
  },
  template: `
    <FormFieldComboBox 
        v-model:value="selected" 
        :options="options" 
        :clearable="true" 
        :disabled="false" 
        name="brands" 
        label="Brands" 
        error="Required field"
    />
  `,
});
