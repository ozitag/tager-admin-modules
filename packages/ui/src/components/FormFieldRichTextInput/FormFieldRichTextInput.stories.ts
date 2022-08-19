import { defineComponent, ref, watch } from "vue";

import FormFieldRichTextInput from "./FormFieldRichTextInput.vue";

export default { title: "FormFieldRichTextInput" };

export const Default = () =>
  defineComponent({
    name: "FormFieldRichTextInputDefault",
    components: { FormFieldRichTextInput },
    setup() {
      const content = ref<string>("<h1>Hello</h1>");

      watch(content, (value) => {
        console.log("Content:", value);
      });

      function getUploadAdapterPluginOptions() {
        return { uploadScenario: "custom" };
      }

      return {
        content,
        getUploadAdapterPluginOptions,
      };
    },
    template: `
      <FormFieldRichTextInput
        v-model:value="content"
        name="content"
        label="Content"
        :get-upload-adapter-options="getUploadAdapterPluginOptions"
      />
    `,
  });

export const WithError = () =>
  defineComponent({
    name: "FormFieldRichTextInputWithError",
    components: { FormFieldRichTextInput },
    setup() {
      const content = ref<string>("");

      watch(content, (value) => {
        console.log("Content:", value);
      });

      return {
        content,
      };
    },
    template: `
      <FormFieldRichTextInput
        v-model:value="content"
        name="content"
        label="Content"
        error="Required field"
      />
    `,
  });

export const Disabled = () =>
  defineComponent({
    name: "FormFieldRichTextInputDisabled",
    components: { FormFieldRichTextInput },
    setup() {
      const content = ref<string>("");

      watch(content, (value) => {
        console.log("Content:", value);
      });

      return {
        content,
      };
    },
    template: `
      <FormFieldRichTextInput
        v-model:value="content"
        name="content"
        label="Content"
        disabled
      />
    `,
  });
