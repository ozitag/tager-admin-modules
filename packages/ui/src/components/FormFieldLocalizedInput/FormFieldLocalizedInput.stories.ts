import type { StoryObj } from "@storybook/vue3-vite";
import { defineComponent, ref, watch } from "vue";

import FormFieldLocalizedInput from "./FormFieldLocalizedInput.vue";

export default { title: "FormFieldLocalizedInput" };

export const RichText: StoryObj = {
  render: () =>
    defineComponent({
      name: "FormFieldLocalizedInputDefault",
      components: { FormFieldLocalizedInput },
      setup() {
        const languages = [
          { label: "Польский", code: "pl" },
          { label: "Русский", code: "ru" },
          { label: "Украинский", code: "ua" },
        ];

        const content = ref<{ pl: string; ru: string; ua: string }>({
          pl: "Poland",
          ru: "Россия",
          ua: "Украина",
        });

        watch(content, (value) => {
          console.log("Content:", value);
        });

        return {
          content,
          languages,
        };
      },
      template: `
      <FormFieldLocalizedInput
        :languages="languages"
        v-model:value="content"
        name="content"
        label="Content"
        type="rich-text"
      />
    `,
    }),
};

export const TextArea: StoryObj = {
  render: () =>
    defineComponent({
      name: "FormFieldLocalizedInputDefault",
      components: { FormFieldLocalizedInput },
      setup() {
        const languages = [
          { label: "Польский", code: "pl" },
          { label: "Русский", code: "ru" },
          { label: "Украинский", code: "ua" },
        ];

        const content = ref<{ pl: string; ru: string; ua: string }>({
          pl: "Poland",
          ru: "Россия",
          ua: "Украина",
        });

        watch(content, (value) => {
          console.log("Content:", value);
        });

        return {
          content,
          languages,
        };
      },
      template: `
      <FormFieldLocalizedInput
        :languages="languages"
        v-model:value="content"
        name="content"
        label="Content"
        type="textarea"
      />
    `,
    }),
};

export const String: StoryObj = {
  render: () =>
    defineComponent({
      name: "FormFieldLocalizedInputDefault",
      components: { FormFieldLocalizedInput },
      setup() {
        const languages = [
          { label: "Польский", code: "pl" },
          { label: "Русский", code: "ru" },
          { label: "Украинский", code: "ua" },
        ];

        const content = ref<{ pl: string; ru: string; ua: string }>({
          pl: "Poland",
          ru: "Россия",
          ua: "Украина",
        });

        watch(content, (value) => {
          console.log("Content:", value);
        });

        return {
          content,
          languages,
        };
      },
      template: `
      {{JSON.stringify(content, null, 2) || "null"}}
      <FormFieldLocalizedInput
        :languages="languages"
        v-model:value="content"
        name="content"
        label="Content"
        type="string"
      />
    `,
    }),
};
