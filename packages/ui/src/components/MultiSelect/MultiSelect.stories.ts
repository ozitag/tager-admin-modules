import { ref, watch } from "vue";

import { brandOptions } from "../../msw/fixtures/brand-options";

import MultiSelect from "./MultiSelect.vue";

export default { title: "MultiSelect" };

const OPTIONS = brandOptions;

export const Default = () => ({
  name: "DefaultMultiSelect",
  components: { MultiSelect },
  setup() {
    const selectedOptions = ref([OPTIONS[2], OPTIONS[5]]);
    const options = ref(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log("selectedOptions:", selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `<MultiSelect v-model:selected-options="selectedOptions" :options="options"  name="countries" :should-display-tags="true" style="width: 300px" />`,
});

export const WithSearch = () => ({
  name: "MultiSelectWithSearch",
  components: { MultiSelect },
  setup() {
    const selectedOptions = ref([OPTIONS[3], OPTIONS[6]]);
    const options = ref(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log("selectedOptions:", selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `<MultiSelect v-model:selected-options="selectedOptions" :options="options" name="countries" :searchable="true" :should-display-tags="true" />`,
});

export const WithMaximum = () => ({
  name: "MultiSelectWithMaximum",
  components: { MultiSelect },
  setup() {
    const selectedOptions = ref([OPTIONS[3], OPTIONS[6]]);
    const options = ref(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log("selectedOptions:", selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `<MultiSelect v-model:selected-options="selectedOptions" :options="options" :max-selected-count="5" name="countries" :searchable="true" :should-display-tags="true" />`,
});
