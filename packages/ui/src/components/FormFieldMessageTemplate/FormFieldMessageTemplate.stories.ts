import { defineComponent, ref } from "vue";

import type { VariableType } from "../../typings/common";

import FormFieldMessageTemplate from "./FormFieldMessageTemplate.vue";

export default { title: "FormFieldMessageTemplate" };

export const Text = () =>
  defineComponent({
    name: "FormFieldMessageTemplateWithText",
    components: { FormFieldMessageTemplate },
    setup() {
      const value = ref<string>("");

      const variables: Array<VariableType> = [
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
      ];

      return {
        value,
        variables,
      };
    },
    template: `
      <FormFieldMessageTemplate
        label="Label"
        v-model:value="value"
        :variable-list="variables"
        type="text"
        error-message="Сейчас тут выводится сообщение об ошибке"
      />
    `,
  });

export const TextArea = () =>
  defineComponent({
    name: "FormFieldMessageTemplateWithTextArea",
    components: { FormFieldMessageTemplate },
    setup() {
      const value = ref<string>("");

      const variables: Array<VariableType> = [
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
      ];

      return {
        value,
        variables,
      };
    },
    template: `
      <FormFieldMessageTemplate
        label="Label"
        v-model:value="value"
        :variable-list="variables"
        type="textArea"
        error-message="Сейчас тут выводится сообщение об ошибке"
      />
    `,
  });

export const RichText = () =>
  defineComponent({
    name: "FormFieldMessageTemplateWithRichText",
    components: { FormFieldMessageTemplate },
    setup() {
      const value = ref<string>("");

      const variables: Array<VariableType> = [
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "message", label: "Message" },
      ];

      return {
        value,
        variables,
      };
    },
    template: `
          <FormFieldMessageTemplate
              label="Label"
              v-model:value="value"
              :variable-list="variables"
              type="richText"
              error-message="Сейчас тут выводится сообщение об ошибке"
          />
        `,
  });
