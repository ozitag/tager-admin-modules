import { defineComponent, ref } from "vue";
import { StoryFn } from "@storybook/vue3";

import type { ResponseBody } from "@tager/admin-services";

import type { BaseOptionType } from "../../typings/common";
import { brandOptions } from "../../msw/fixtures/brand-options";
import type { BrandType } from "../../msw/fixtures/brand-list";

import ComboBox from "./ComboBox.vue";

export default { title: "ComboBox" };

const OPTIONS = brandOptions;

export const Default: StoryFn = () =>
  defineComponent({
    name: "DefaultComboBox",
    components: { ComboBox },
    setup() {
      const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);
      const selected = ref<BaseOptionType | null>(null);

      return {
        options,
        selected,
      };
    },
    template: `
        <ComboBox v-model:value="selected" :options="options"  />
    `,
  });

export const Playground: StoryFn = (args) =>
  defineComponent({
    name: "DefaultComboBox",
    components: { ComboBox },
    setup() {
      const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);
      const selected = ref<BaseOptionType | null>(null);

      return {
        options,
        selected,
        args,
      };
    },
    template: `
        <ComboBox v-model:value="selected" :options="options" v-bind="args"  />
    `,
  });

Playground.args = {
  placeholder: "Choose your destiny...",
  disabled: false,
  clearable: false,
  searchable: true,
  noOptionsMessage: "",
  notFoundMessage: "",
  loading: false,
};

export const Ajax = () =>
  defineComponent({
    name: "AjaxComboBox",
    components: { ComboBox },
    setup() {
      const isLoading = ref<boolean>(false);
      const options = ref<Array<BaseOptionType>>([]);
      const selected = ref<BaseOptionType | null>(null);

      function fetchBrands(value: string) {
        isLoading.value = true;

        const url = `/admin/brands?query=${encodeURIComponent(value)}`;

        fetch(url)
          .then<ResponseBody<Array<BrandType>>>((response) => response.json())
          .then((body) => {
            isLoading.value = false;

            options.value = body.data.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }));
          })
          .catch((error) => {
            isLoading.value = false;
            console.error(error);
          });
      }

      function handleChange(value: BaseOptionType) {
        isLoading.value = false;
        // selected.value = value;
        options.value = [];
      }

      return {
        options,
        selected,
        isLoading,
        fetchBrands,
        handleChange,
      };
    },
    template: `
      <ComboBox
        v-model:value="selected"
        :options="options"
        :clearable="true"
        @change="handleChange"
        @change:query="fetchBrands"
        :loading="isLoading"
        :filterable="false"
      />
  `,
  });

export const CommonSelect = () =>
  defineComponent({
    name: "DefaultComboBox",
    components: { ComboBox },
    setup() {
      const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);
      const selected = ref<BaseOptionType | null>(OPTIONS[OPTIONS.length - 10]);

      return {
        options,
        selected,
      };
    },
    template: `
      <ComboBox
        v-model:value="selected"
        :options="options"
        :clearable="true"
        :disabled="false"
        :searchable="false"
      />
    `,
  });

export const TestPopupFlip: StoryFn = () =>
  defineComponent({
    name: "DefaultComboBoxFlip",
    components: { ComboBox },
    setup() {
      const options = ref<ReadonlyArray<BaseOptionType>>(OPTIONS);
      const selected = ref<BaseOptionType | null>(null);

      return {
        options,
        selected,
      };
    },
    template: `
      <div>
        <div style="display: flex; flex-direction: column; height: 600px; background-color: #eee; padding: 10px;">
          <p>Scroll bottom</p>
          <div style="flex: 1"></div>
          <p>Click</p>
        </div>
        
        <ComboBox v-model:value="selected" :options="options" />
        
        <div style="display: flex; flex-direction: column; height: 600px; background-color: #eee; padding: 10px;">
          <p>Click</p>
          <div style="flex: 1"></div>
          <p>Scroll top</p>
        </div>
      </div>
    `,
  });
