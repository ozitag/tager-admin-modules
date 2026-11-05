import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import { BaseButton } from "../BaseButton";

import Steps from "./Steps.vue";
import type { StepType } from "./Steps.types";

export default { title: "Steps" };

const STEPS: Array<StepType> = [
  { title: "Login" },
  { title: "Verification" },
  { title: "Pay" },
  { title: "Done" },
];

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      name: "DefaultSteps",
      components: { Steps, BaseButton },
      setup() {
        return { args };
      },
      template: `
        <div>
          <Steps v-bind="args" />
        </div>
      `,
    }),

  args: {
    current: 0,
    steps: STEPS,
  },
};
