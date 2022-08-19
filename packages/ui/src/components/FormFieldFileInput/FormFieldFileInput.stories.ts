import { defineComponent, ref, watch } from "vue";

import { createId } from "@tager/admin-services";

import type { SingleFileInputValueType } from "../FileInput/FileInput.types";

import FormFieldFileInput from "./FormFieldFileInput.vue";

export default { title: "FormFieldFileInput" };

const TEST_FILES: Array<SingleFileInputValueType> = [
  {
    id: createId(),
    file: {
      id: "47",
      mime: "image/png",
      name: "2.png",
      size: 29280,
      url: "https://ozitag.com/logo.png",
    },
  },
  {
    id: createId(),
    file: {
      id: "174",
      mime: "image/png",
      name: "og-image.png",
      size: 386793,
      url: "https://sortablejs.github.io/Sortable/st/og-image.png",
    },
  },
  {
    id: createId(),
    file: {
      id: "175",
      mime: "image/jpeg",
      name: "e0cbc508796c2af24.zip",
      size: 386793,
      url: "https://ozitag.com/logo.png",
    },
  },
  {
    id: createId(),
    file: {
      id: "171",
      mime: "image/svg",
      name: "logo.svg",
      size: 423630,
      url: "https://raw.githubusercontent.com/SortableJS/Vue.Draggable/master/logo.svg?sanitize=true",
    },
  },
];

export const Default = () =>
  defineComponent({
    name: "FormFieldFileInputDefault",
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log("File: ", file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="file" name="file" label="Content" error="Error message" />',
  });

export const WithCaption = () =>
  defineComponent({
    name: "FormFieldFileInputDefault",
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log("File: ", file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="file" name="file" label="Content" with-captions error="Error message" />',
  });

export const Multiple = () =>
  defineComponent({
    name: "FormFieldFileInputDefault",
    components: { FormFieldFileInput },
    setup() {
      const files = ref(TEST_FILES);

      watch(files, () => {
        console.log("Files: ", files);
      });

      return {
        files,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="files" name="files" multiple label="Content" error="Error message" />',
  });

export const MultipleWithCaptions = () =>
  defineComponent({
    name: "FormFieldFileInputDefault",
    components: { FormFieldFileInput },
    setup() {
      const files = ref(TEST_FILES);

      watch(files, () => {
        console.log("Files: ", files);
      });

      return {
        files,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="files" name="files" multiple label="Content" with-captions error="Error message" />',
  });

export const WithError = () =>
  defineComponent({
    name: "FormFieldFileInputWithError",
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log("File: ", file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="file" name="file" label="Content" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    name: "FormFieldFileInputDisabled",
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log("File: ", file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model:value="file" name="file" label="Content" disabled error="Error message" />',
  });
