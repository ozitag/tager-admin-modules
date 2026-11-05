import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import BaseCheckbox from "../BaseCheckbox";

import OptionsSwitcher from "./OptionsSwitcher.vue";
import OptionsSwitcherYesNo from "./OptionsSwitcherTrueFalse.vue";

export default {
  components: { OptionsSwitcher },
  title: "OptionsSwitcher",
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcher },
      template: `
      <div :style="{width: '500px'}">
      <OptionsSwitcher :options="[
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Option 3'},
]"/>
      </div>
    `,
    }),
};

export const WithColors: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcher },
      template: `
      <div :style="{width: '500px'}">
      <OptionsSwitcher :options="[
  {value: '1', label: 'Option 1', activeColor: 'green', activeTextColor: 'black'},
  {value: '2', label: 'Option 2', activeColor: 'red', activeTextColor: '#fff'},
]"/>
      </div>
    `,
    }),
};

export const WithValue: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcher },
      template: `
      <div :style="{width: '500px'}">
      <OptionsSwitcher :options="[
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Option 3'},
        ]" value="2"/>
      </div>
    `,
    }),
};

export const YesNo: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcherYesNo },
      template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo/>
      </div>
    `,
    }),
};

export const YesNoColor: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcherYesNo },
      template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo false-color="red" false-text-color="#fff" true-color="green" true-text-color="#fff"/>
      </div>
    `,
    }),
};

export const YesNoWithValue: StoryObj = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcherYesNo },
      template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo :value="true"/>
      </div>
    `,
    }),
};

/*
 * The two stories below name their component explicitly. A bare `StoryObj`
 * makes TypeScript infer `render`'s return against a very wide union, which
 * tips over the complexity limit (TS2590) in this file.
 */
export const YesNoWithValueAndEvent: StoryObj<typeof OptionsSwitcherYesNo> = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcherYesNo },
      setup: () => {
        const value = ref<boolean>(false);

        const onChange = (newValue: boolean) => {
          console.log("newValue", newValue);
          value.value = newValue;
        };

        return {
          value,
          onChange,
        };
      },
      template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo :value="value" @change="onChange"/>
      </div>
    `,
    }),
};

export const YesNoVModel: StoryObj<typeof OptionsSwitcherYesNo> = {
  render: () =>
    defineComponent({
      components: { OptionsSwitcherYesNo, BaseCheckbox },
      setup: () => {
        const value = ref<boolean>(false);

        return {
          value,
        };
      },
      template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo v-model:value="value"/>
      <br/>
      <BaseCheckbox v-model:checked="value"/>
      </div>
    `,
    }),
};
