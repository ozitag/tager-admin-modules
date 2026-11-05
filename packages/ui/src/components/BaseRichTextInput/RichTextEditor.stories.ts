import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref } from "vue";

import BaseRichTextInput from "./BaseRichTextInput.vue";

export default {
  title: "BaseRichTextInput",
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseRichTextInput },
      setup() {
        function getUploadAdapterPluginOptions() {
          return { uploadScenario: "custom" };
        }

        const value = ref("");

        return {
          getUploadAdapterPluginOptions,
          value,
        };
      },
      template: `
      <BaseRichTextInput :get-upload-adapter-options="getUploadAdapterPluginOptions" v-model:value="value"/>`,
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseRichTextInput },
      setup() {
        function getUploadAdapterPluginOptions() {
          return { uploadScenario: "custom" };
        }

        const value = ref("");

        return {
          getUploadAdapterPluginOptions,
          value,
        };
      },
      template: `
      <BaseRichTextInput :get-upload-adapter-options="getUploadAdapterPluginOptions" :disabled="true" v-model:value="value"/>`,
    }),
};
