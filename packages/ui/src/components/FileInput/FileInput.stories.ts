import { defineComponent, ref } from "vue";

import { createId } from "@tager/admin-services";

import type { SingleFileInputValueType } from "../../typings/common";

import FileInput from "./FileInput.vue";

export default { title: "FileInput" };

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
    components: { FileInput },
    setup() {
      const image = ref<SingleFileInputValueType | null>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
      <FileInput v-model:value="image" label="File" />
    `,
  });

export const Multiple = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const images = ref<Array<SingleFileInputValueType>>(TEST_FILES);

      return {
        images,
      };
    },
    template: `
      <FileInput v-model:value="images" multiple with-captions />
    `,
  });

export const Simple = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const image = ref<SingleFileInputValueType | null>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
      <div style='width: 300px;'><FileInput v-model:value="image" :url-upload-enabled='false' /></div>
    `,
  });
