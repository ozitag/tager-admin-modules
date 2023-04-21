import { defineComponent, ref } from "vue";

import BaseCheckbox from "../BaseCheckbox";

import OptionsSwitcher from "./OptionsSwitcher.vue";
import OptionsSwitcherYesNo from "./OptionsSwitcherTrueFalse.vue";

export default {
  components: { OptionsSwitcher },
  title: "OptionsSwitcher",
};

export const Default = () =>
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
  });

export const WithColors = () =>
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
  });

export const WithValue = () =>
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
  });

export const YesNo = () =>
  defineComponent({
    components: { OptionsSwitcherYesNo },
    template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo/>
      </div>
    `,
  });

export const YesNoColor = () =>
  defineComponent({
    components: { OptionsSwitcherYesNo },
    template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo false-color="red" false-text-color="#fff" true-color="green" true-text-color="#fff"/>
      </div>
    `,
  });

export const YesNoWithValue = () =>
  defineComponent({
    components: { OptionsSwitcherYesNo },
    template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcherYesNo :value="true"/>
      </div>
    `,
  });

export const YesNoWithValueAndEvent = () =>
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
  });

export const YesNoVModel = () =>
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
  });
