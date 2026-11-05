import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import ProgressBar from "./ProgressBar.vue";

export default { title: "ProgressBar" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { ProgressBar },
      template: `<ProgressBar />`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { ProgressBar },
      setup() {
        return { args };
      },
      template: `
        <ProgressBar v-bind="args" />
      `,
    }),

  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "info", "warning", "danger", "success"],
    },
  },

  args: {
    color: "info",
    percent: 25,
  },
};
