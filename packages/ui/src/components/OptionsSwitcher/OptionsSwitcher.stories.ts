import { defineComponent } from "vue";

import OptionsSwitcher from "./OptionsSwitcher.vue";

export default {
  components: { OptionsSwitcher },
  title: "OptionsSwitcher",
};

export const Default = () =>
  defineComponent({
    components: { OptionsSwitcher },
    template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcher :options="[
  {value: '1', label: 'Yes'},
  {value: '2', label: 'No'},
]"/>
      </div>
    `,
  });

export const WithValue = () =>
  defineComponent({
    components: { OptionsSwitcher },
    template: `
      <div :style="{width: '300px'}">
      <OptionsSwitcher :options="[
          {value: '1', label: 'Yes'},
          {value: '2', label: 'No'},
        ]" value="1"/>
      </div>
    `,
  });

export const WithValueSecond = () =>
  defineComponent({
    components: { OptionsSwitcher },
    template: `
      <div :style="{width: '300px'}">
        <OptionsSwitcher :options="[
          {value: '1', label: 'Yes'},
          {value: '2', label: 'No'},
        ]" value="2"/>
      </div>
    `,
  });
