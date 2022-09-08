import { defineComponent } from "vue";
import type { Story } from "@storybook/vue3";

import ProgressBar from "./ProgressBar.vue";

export default { title: "ProgressBar" };

export const Default = () =>
  defineComponent({
    components: { ProgressBar },
    template: `<ProgressBar />`,
  });

export const Playground: Story = (args) =>
  defineComponent({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar v-bind="args" />
    `,
  });

Playground.argTypes = {
  color: {
    control: "select",
    options: ["primary", "secondary", "info", "warning", "danger", "success"],
  },
};

Playground.args = {
  color: "info",
  percent: 25,
};
