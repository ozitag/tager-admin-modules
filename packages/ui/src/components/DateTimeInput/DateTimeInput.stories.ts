import type { StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import type { Nullable } from "@tager/admin-services";

import DateTimeInput from "./DateTimeInput.vue";

export default { title: "DateTimeInput" };

export const Default: StoryObj = {
  render: () => ({
    name: "DateTimeInput_Default",
    components: { DateTimeInput },
    setup() {
      const value = ref<Nullable<string>>("");

      return { value };
    },
    template: `
    <DateTimeInput
      v-model:value="value"
      label="Post date"
      name="creationDate"
    />
  `,
  }),
};
