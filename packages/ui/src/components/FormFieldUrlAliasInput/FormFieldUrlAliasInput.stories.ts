import FormFieldUrlAliasInput from "./FormFieldUrlAliasInput.vue";

export default { title: "FormFieldUrlAliasInput" };

export const Default = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: "",
    };
  },
  template:
    '<FormFieldUrlAliasInput v-model:value="alias" label="URL alias" url-template="http://ozitag.com/posts/1-{alias}-url" />',
});

export const WithError = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: "",
    };
  },
  template:
    '<FormFieldUrlAliasInput v-model:value="alias" label="URL alias" error="Required field" url-template="http://ozitag.com/posts/1-{alias}-url" />',
});

export const Disabled = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: "",
    };
  },
  template:
    '<FormFieldUrlAliasInput v-model:value="alias" label="URL alias" disabled url-template="http://ozitag.com/posts/1-{alias}-url" />',
});
