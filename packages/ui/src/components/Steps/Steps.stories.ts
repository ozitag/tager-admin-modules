import { defineComponent } from "vue";
import type { Story } from "@storybook/vue3";

import { BaseButton } from "../BaseButton";

import Steps from "./Steps.vue";
import { StepType } from "./Steps.types";

export default { title: "Steps" };

const STEPS: Array<StepType> = [
  { title: "Login" },
  { title: "Verification" },
  { title: "Pay" },
  { title: "Done" },
];

export const Playground: Story = (args) =>
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
  });

Playground.args = {
  current: 0,
  steps: STEPS,
};
