import { ref } from "vue";

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

export const WithValue = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    const visible = ref<boolean>(false);

    return {
      alias: "15-best-offline-games-android-ios",
      visible,
      change: () => {
        visible.value = !visible.value;
      },
    };
  },
  template: `<div>
    <div :style="!visible ? {display: 'none'} : {}">
        <FormFieldUrlAliasInput v-model:value="alias" label="URL alias" url-template="https://skich.app/playlists/{alias}" />
    </div>
    <button @click="change">Show / Hide</button>
  </div>`,
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
