import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import { BaseButton } from "../BaseButton";

import Steps, { StepType } from "./Steps.vue";

export default { title: "Steps" };

const STEPS: Array<StepType> = [
  { title: "Login" },
  { title: "Verification" },
  { title: "Pay" },
  { title: "Done" },
];

export const Playground: StoryFn = (args) =>
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
