<template>
  <div class="component">
    <FormGroup class="editor">
      <InputLabel>Editor</InputLabel>

      <div class="editor-header">
        <UploadFile @change="handleFileChange" />
      </div>

      <div class="editor-body">
        <BaseTextArea
          :value="value"
          class="editor"
          :rows="8"
          @input="handleEditorChange"
        />
      </div>
    </FormGroup>

    <FormGroup class="output">
      <InputLabel>Output</InputLabel>
      <BrowserWindow>
        <iframe class="output-iframe" :srcdoc="value" />
      </BrowserWindow>
    </FormGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, type SetupContext } from "vue";

import type { Nullable } from "@tager/admin-services";

import FormGroup from "../FormGroup.vue";
import InputLabel from "../InputLabel";
import BaseTextArea from "../BaseTextArea";

import UploadFile from "./components/UploadFile";
import BrowserWindow from "./components/BrowserWindow";
import { convertFileToText } from "./Code.helpers";

interface Props {
  value: string | ArrayBuffer;
}

export default defineComponent({
  name: "BaseCode",
  components: {
    FormGroup,
    InputLabel,
    BaseTextArea,
    UploadFile,
    BrowserWindow,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props: Props, context: SetupContext) {
    const handleFileChange = (file: Nullable<File>) => {
      if (!file) return;

      convertFileToText(file).then((text) => {
        context.emit("update:value", text);
      });
    };

    const handleEditorChange = (value: string) => {
      context.emit("update:value", value);
    };

    return {
      handleFileChange,
      handleEditorChange,
    };
  },
});
</script>

<style lang="scss">
.component {
  display: grid;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  column-gap: 20px;
}

.editor {
  display: grid !important;
  grid-template-rows: auto auto 1fr;
}

.editor-header {
  margin-bottom: 0.5rem;
}

.output {
  display: grid !important;
  grid-template-rows: auto 1fr;

  &-iframe {
    display: block;
    margin: 0;
    border: 0;
    width: 100%;
    height: 100%;
  }
}

.upload-file {
  display: block;
}
</style>
