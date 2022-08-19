import { ref } from "vue";

import ButtonField from "./ButtonField.vue";
import type { ButtonFieldValueType } from "./ButtonField.helpers";

export default { title: "ButtonField" };

export const Default = () => ({
  name: "BaseSelect_Default",
  components: { ButtonField },
  setup() {
    const value = ref<ButtonFieldValueType>({
      label: "",
      link: "",
      isNewTab: false,
    });

    return { value };
  },
  template: `
    <ButtonField
      v-model:value="value"
      label="CTA Button"
    />
  `,
});
