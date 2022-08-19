import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import BaseInput from "./BaseInput.vue";

export default { title: "BaseInput" };

export const Default = () =>
  defineComponent({
    components: { BaseInput },
    template: `<BaseInput />`,
  });

export const Playground: StoryFn = (args) =>
  defineComponent({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: `<BaseInput v-bind="args" />`,
  });

Playground.argTypes = {
  type: {
    control: "select",
    options: ["text", "email", "password", "date", "time"],
  },
};

Playground.args = {
  value: "",
  disabled: false,
  readonly: false,
  type: "text",
};

export const Readonly = () => ({
  components: { BaseInput },
  template: '<BaseInput value="default text" :readonly="true" />',
});

export const Disabled = () => ({
  components: { BaseInput },
  template: '<BaseInput value="default text"  :disabled="true" />',
});
