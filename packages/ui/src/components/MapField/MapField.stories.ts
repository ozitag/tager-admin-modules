import { ref } from "vue";

import MapField from "./MapField.vue";
import type { MapFieldValueType } from "./MapField.helpers";

export default { title: "MapField" };

export const Default = () => ({
  name: "MapField_Default",
  components: { MapField },
  setup() {
    const value = ref<MapFieldValueType>(null);

    return { value };
  },
  template: `
    <MapField
      v-model:value="value"
      label="Map"
    />
  `,
});
