<template>
  <div
      :class="[
      'file-input-container',
      {
        'with-captions': withCaptions,
        'is-multiple': multiple && fileList.length > 0,
      },
    ]"
  >
    <div v-if="!multiple && fileList.length > 0" class="header">
      <label v-if="!!label" class="header-label">
        {{ label }}
      </label>
      <TabList
          v-if="urlUploadEnabled && fileList.length === 0"
          v-model:tab-id="selectedTabId"
          :aligned-right="true"
          class="file-tab-list"
          :tab-list="tabList"
      />
    </div>

    <div
        v-if="uploadingFileList.length > 0"
        :class="[
        'file-grid',
        { 'is-multiple': multiple, 'is-top-divider': multiple },
      ]"
    >
      <div
          v-for="entry of uploadingFileList"
          :key="entry.id"
          :class="[
          'file-wrapper',
          { single: !multiple },
          { uploading: entry.status === 'UPLOADING' },
          { error: entry.status === 'ERROR' },
        ]"
          :title="getFileHtmlTitle(entry.file)"
      >
        <div class="file-container">
          <BaseButton
              class="clear-button"
              variant="icon"
              title="Clear"
              @click="clearFile(entry)"
          >
            <CloseIcon/>
          </BaseButton>

          <ProgressBar
              v-if="entry.status === 'UPLOADING'"
              :percent="entry.progress"
              class="upload-progress"
          />
          <div v-else-if="entry.status === 'ERROR'" class="error-message">
            {{ entry.error }}
            <div class="file-caption">
              <span class="file-name">{{ entry.file.name }}</span>
              <small class="file-size">
                ({{ getFileSize(entry.file.size) }})
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!multiple && fileList.length === 0" class="header">
      <label v-if="!!label" class="header-label">
        {{ label }}
      </label>
      <TabList
          v-if="urlUploadEnabled && savedFileList.length === 0"
          v-model:tab-id="selectedTabId"
          :aligned-right="true"
          class="file-tab-list"
          :tab-list="tabList"
      />
    </div>

    <div
        v-if="savedFileList.length > 0"
        ref="fileGridRef"
        :class="['file-grid', { 'is-multiple': multiple }]"
    >
      <div
          v-for="entry of savedFileList"
          :key="entry.id"
          :class="[
          'file-wrapper',
          { single: !multiple },
          { uploading: entry.status === 'UPLOADING' },
          { error: entry.status === 'ERROR' },
        ]"
          :title="getFileHtmlTitle(entry.file)"
          :data-draggable-id="entry.id"
      >
        <div class="file-container">
          <BaseButton
              class="clear-button"
              variant="icon"
              title="Clear"
              @click="clearFile(entry)"
          >
            <CloseIcon/>
          </BaseButton>

          <div class="file-inner">
            <div class="file-inner-data">
              <a :href="entry.file.url" class="file-link" target="_blank">
                <LoadableImage
                    v-if="isImage(entry.file)"
                    :src="entry.file.url"
                    :alt="entry.file.name"
                    class="file-image"
                />
                <component
                    :is="getFileIconVueComponent(entry.file)"
                    v-else
                    class="file-icon"
                />
              </a>

              <div v-if="!isImage(entry.file)" class="file-caption">
                <span class="file-name">{{ entry.file.name }}</span>
                <small class="file-size">
                  ({{ getFileSize(entry.file.size) }})
                </small>
              </div>
            </div>

            <div v-if="withCaptions" class="caption-text-wrapper">
              <BaseTextArea
                  class="caption-text-area"
                  :rows="2"
                  placeholder="Caption"
                  :value="entry.caption || ''"
                  @update:value="handleCaptionChange(entry, $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="multiple" class="header">
      <label class="header-label">
        {{ label }}
      </label>
      <TabList
          v-if="urlUploadEnabled"
          v-model:tab-id="selectedTabId"
          class="file-tab-list"
          :aligned-right="true"
          :tab-list="tabList"
      />
    </div>

    <div
        v-if="shouldDisplayDropbox"
        ref="dropbox"
        :class="[
        'drop-zone',
        {
          highlight: isDragOver,
          'no-hover': selectedTabId === 'url',
          'is-upload-file': selectedTabId === 'file',
        },
      ]"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @drop="handleDrop"
        @dragleave="handleDragLeave"
    >
      <UploadFileFromUrlForm
          v-if="selectedTabId === 'url'"
          :disabled="disabled"
          @change="handleUploadFromUrlChange"
      />

      <div v-else-if="selectedTabId === 'file'">
        <div class="upload-message-container">
          <CloudUploadIcon/>
          <p>{{ computedPlaceholderMessage }}</p>
        </div>

        <label class="file-input-label">
          <input
              ref="fileInputRef"
              type="file"
              class="visually-hidden"
              :accept="acceptableMimeTypes"
              :multiple="multiple"
              :disabled="disabled"
              @change="handleChange"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, type PropType, type Ref, ref} from "vue";
import type {Component} from "@vue/runtime-core";

import {
  createId,
  type FileType,
  getMessageFromError,
  isNotNullish,
  notEmpty,
  type Nullable,
  RequestError,
  upload,
  useI18n,
} from "@tager/admin-services";

import {ARCHIVE_ACCEPT} from "../../constants/common";
import {BaseButton} from "../BaseButton";
import BaseTextArea from "../BaseTextArea";
import ProgressBar from "../ProgressBar";
import LoadableImage from "../LoadableImage";
import TabList from "../TabList";
import UploadFileFromUrlForm from "../UploadFileFromUrlForm";
import CloudUploadIcon from "../../icons/CloudUploadIcon.vue";
import CloseIcon from "../../icons/CloseIcon.vue";
import {useSortable} from "../../hooks/useSortable";

import {getFileIconComponent} from "./FileInput.helpers";
import type {
  FileInputValueType,
  SingleFileInputValueType,
  TabListType,
  UploadingSingleFileInputValueType,
} from "./FileInput.types";
import {FileInputValueSchema} from "./FileInput.types";

interface Props {
  required?: string;
  value: FileInputValueType | null | undefined;
  multiple: boolean;
  withCaptions: boolean;
  accept: string | null;
  placeholderMessage: string | null;
  maxFileCount: number | null;
  fileType: "image" | "archive" | "";
  scenario: string | null;
  urlUploadEnabled: boolean | null;
  disabled: boolean;
}

export default defineComponent({
  name: "FileInput",
  components: {
    BaseButton,
    ProgressBar,
    BaseTextArea,
    LoadableImage,
    TabList,
    UploadFileFromUrlForm,
    CloudUploadIcon,
    CloseIcon,
  },
  props: {
    value: {
      type: [Object, Array] as PropType<Props["value"]>,
      validator(value: unknown) {
        return value === null || FileInputValueSchema.safeParse(value).success;
      },
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    withCaptions: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "",
    },
    placeholderMessage: {
      type: String,
      default: "",
    },
    maxFileCount: {
      type: Number,
      default: null,
    },
    urlUploadEnabled: {
      type: Boolean,
      default: true,
    },
    fileType: {
      type: String as PropType<Props["fileType"]>,
      validator: (value: string) =>
          !value || ["image", "archive"].includes(value),
      default: "",
    },
    scenario: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:value"],
  setup(props: Props, context) {
    const i18n = useI18n();
    const fileGridRef: Ref<HTMLDivElement | null> = ref(null);

    const fileInputRef: Ref<HTMLInputElement | null> = ref(null);
    const isDragOver = ref<boolean>(false);
    const uploadingFileList: Ref<Array<UploadingSingleFileInputValueType>> =
        ref([]);
    const selectedTabId = ref<string>("file");
    const tabList = ref<Array<TabListType>>([
      {
        id: "url",
        label: i18n.t("ui:fileInput.uploadFileByURL"),
      },
      {
        id: "file",
        label: i18n.t("ui:fileInput.uploadFile"),
      },
    ]);

    const savedFileList = computed<Array<SingleFileInputValueType>>(() => {
      return props.multiple
          ? (props.value as Array<SingleFileInputValueType>)
          : [props.value as SingleFileInputValueType | null].filter(isNotNullish);
    });

    function emitChangeEvent(newFiles: Array<SingleFileInputValueType>) {
      const newValue = props.multiple ? newFiles : newFiles[0];
      context.emit("update:value", newValue ?? null);
    }

    useSortable({
      elementRef: fileGridRef,
      entityList: savedFileList,
      onChange: emitChangeEvent,
    });

    const fileList = computed<Array<SingleFileInputValueType | UploadingSingleFileInputValueType>>(() => {
      return [...savedFileList.value, ...uploadingFileList.value];
    });

    const shouldDisplayDropbox = computed<boolean>(() => {
      if (props.multiple && typeof props.maxFileCount === "number") {
        return savedFileList.value.length < props.maxFileCount;
      }
      if (!props.multiple) {
        return (
            savedFileList.value.length === 0 &&
            uploadingFileList.value.length === 0
        );
      }
      return true;
    });

    const acceptableMimeTypes = computed<string | undefined>(() => {
      if (props.accept) return props.accept;
      if (props.fileType === "image") {
        return "image/*";
      }
      if (props.fileType === "archive") {
        return ARCHIVE_ACCEPT;
      }
      return undefined;
    });

    const computedPlaceholderMessage = computed<string>(() => {
      if (props.placeholderMessage) return props.placeholderMessage;

      switch (props.fileType) {
        case "image":
          return i18n.t("ui:fileInput.dragAndDropAnImageHereOrClick");
        case "archive":
          return i18n.t("ui:fileInput.dragAndDropAnArchiveHereOrClick");
        default:
          return i18n.t("ui:fileInput.dragAndDropAFileHereOrClick");
      }
    });

    function createUploadingFile(
        nativeFile: File
    ): UploadingSingleFileInputValueType {
      return {
        id: createId(),
        file: {
          id: String(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)),
          url: "",
          name: nativeFile.name,
          size: nativeFile.size ?? 0,
          mime: nativeFile.type ?? "",
        },
        caption: null,
        nativeFile,
        xhr: new XMLHttpRequest(),
        status: "UPLOADING",
        progress: 1,
        error: null,
      };
    }

    function getUploadErrorMessage(error: Error) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 413:
            return i18n.t("ui:fileInput.fileTooLarge");
          case 404:
            return i18n.t("ui:fileInput.uploadEndpointIsNotFound");
        }
      }
      return getMessageFromError(error) || "Error";
    }

    function removeFileExtension(value: string): string {
      const index = value.lastIndexOf(".");
      return index === -1 ? value : value.slice(0, index);
    }

    function handleFiles(pendingFileList: Nullable<FileList>): void {
      const fileArray = pendingFileList ? [...pendingFileList] : [];
      uploadingFileList.value.push(...fileArray.map(createUploadingFile));

      Promise.all(
          uploadingFileList.value.map((uploadingValue) => {
            return upload<FileType>({
              file: uploadingValue.nativeFile,
              params: props.scenario ? {scenario: props.scenario} : undefined,
              onProgress: ({progress}) => {
                uploadingValue.progress = progress * 100;
              },
              xhr: uploadingValue.xhr,
            })
                .then((savedFile) => {
                  const newValue: SingleFileInputValueType = {
                    id: createId(),
                    file: savedFile,
                    caption: removeFileExtension(savedFile.name),
                  };

                  const newValues: Array<SingleFileInputValueType> = [
                    ...savedFileList.value,
                    newValue,
                  ].filter(notEmpty);

                  emitChangeEvent(newValues);

                  uploadingFileList.value = uploadingFileList.value.filter(
                      (value) => value.id !== uploadingValue.id
                  );
                })
                .catch((error) => {
                  uploadingValue.status = "ERROR";
                  uploadingValue.error = getUploadErrorMessage(error);
                });
          })
      ).finally(() => {
        /** Clear value of file input */
        if (fileInputRef.value) {
          fileInputRef.value.value = "";
        }
      });
    }

    function handleChange(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      handleFiles(inputElement.files);
    }

    function handleUploadFromUrlChange(savedFile: FileType) {
      const newValue: SingleFileInputValueType = {
        id: createId(),
        file: savedFile,
        caption: removeFileExtension(savedFile.name),
      };

      const newValues: Array<SingleFileInputValueType> = [
        ...savedFileList.value,
        newValue,
      ].filter(notEmpty);

      emitChangeEvent(newValues);
    }

    function handleDragEnter(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      highlightDropArea();
    }

    function handleDragOver(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      highlightDropArea();
    }

    function handleDragLeave(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      unhighlightDropArea();
    }

    function handleDrop(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      unhighlightDropArea();
      const dataTransfer = event.dataTransfer;
      handleFiles(dataTransfer?.files ?? null);
    }

    function clearFile(valueToClear: UploadingSingleFileInputValueType) {
      if (valueToClear.status === "UPLOADING") {
        valueToClear.xhr.abort();
      }
      if (valueToClear.status === "ERROR") {
        uploadingFileList.value = uploadingFileList.value.filter(
            (value) => value.id !== valueToClear.id
        );
      } else {
        const newFiles = savedFileList.value.filter(
            (value) => value.id !== valueToClear.id
        );
        emitChangeEvent(newFiles);
      }
    }

    function handleCaptionChange(
        updatedValue: SingleFileInputValueType,
        newCaption: string
    ): void {
      updatedValue.caption = newCaption;
      emitChangeEvent(savedFileList.value);
    }

    function getFileSize(bytes: number): string {
      const unitList = ["bytes", "kB", "MB"];
      let fileSize = bytes;
      let unitIndex = 0;

      while (fileSize > 1024) {
        fileSize = fileSize / 1024;
        unitIndex += 1;
      }

      const fractionDigitCount = fileSize < 10 ? 2 : fileSize < 100 ? 1 : 0;

      return [fileSize.toFixed(fractionDigitCount), unitList[unitIndex]].join(
          " "
      );
    }

    function getFileHtmlTitle(file: FileType): string {
      return [
        `Name: ${file.name}`,
        `Size: ${getFileSize(file.size)} (${file.size} bytes)`,
        `MIME type: ${file.mime}`,
      ].join("\n");
    }

    function isImage(file: FileType): boolean {
      return file.mime.startsWith("image/");
    }

    function getFileIconVueComponent(file: FileType): Component {
      return getFileIconComponent(file);
    }

    function highlightDropArea(): void {
      isDragOver.value = true;
    }

    function unhighlightDropArea() {
      isDragOver.value = false;
    }

    function handleTabUpdate(tabId: string): void {
      selectedTabId.value = tabId;
    }

    return {
      tabList,
      fileList,
      isDragOver,
      fileInputRef,
      selectedTabId,
      acceptableMimeTypes,
      shouldDisplayDropbox,
      computedPlaceholderMessage,
      handleChange,
      handleTabUpdate,
      handleCaptionChange,
      handleUploadFromUrlChange,
      handleDragEnter,
      handleDragOver,
      handleDrop,
      handleDragLeave,
      getFileSize,
      isImage,
      getFileIconVueComponent,
      getFileHtmlTitle,
      clearFile,
      emitChangeEvent,

      savedFileList,
      uploadingFileList,
      fileGridRef,
    };
  },
});
</script>

<style scoped lang="scss">
.file-input-container {
  position: relative;

  &.with-captions {
    .drop-zone,
    .file-container {
      height: 300px;
    }
  }

  &.is-multiple {
    margin-top: 0;
  }
}

.drop-zone {
  position: relative;
  height: 220px;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #fff;
  transition: background-color 0.15s linear, box-shadow 0.15s linear;
  border: 1px solid rgba(0, 0, 0, 0.16);

  &:hover {
    background-color: rgba(62, 69, 81, 0.05);

    &:not(.no-hover) :deep([data-ui-tab][data-active] [data-ui-tab-button]) {
      background-color: rgba(62, 69, 81, 0.05);
    }
  }

  &.highlight {
    background-color: rgba(62, 69, 81, 0.05);
  }

  &.no-hover:hover {
    background-color: transparent;
  }

  &.is-upload-file {
    border-top-right-radius: 0;
  }
}

.upload-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    display: block;
    width: 60px;
    height: auto;
    fill: #bbb;
  }

  p {
    color: #bbb;
    display: block;
    text-align: center;
  }
}

.file-input-label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
}

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.file-grid {
  display: flex;
  flex-wrap: wrap;

  &.is-multiple {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    margin-top: -0.5rem;

    .file-wrapper {
      padding: 0.5rem 0.5rem;
    }
  }
}

.file-wrapper {
  flex: 0 0 25%;
  width: 25%;

  @media (max-width: 1600px) {
    flex: 0 0 33.3333333333%;
    width: 33.3333333333%;
  }

  &.single {
    flex-basis: 100%;
  }

  &.error {
    .file-container {
      border-color: var(--danger);
    }

    .clear-button {
      background-color: rgba(220, 53, 69, 0.2);
      color: var(--danger);
      border-color: rgba(220, 53, 69, 0.4);
      box-shadow: 0 3px 2px -1px rgba(220, 53, 69, 0.2),
      0px 1px 5px 0px rgba(220, 53, 69, 0.14),
      0px 1px 5px 0px rgba(220, 53, 69, 0.12);
    }

    .file-size {
      color: rgba(220, 53, 69, 0.7);
    }
  }
}

.file-container {
  padding: 0.6rem;

  height: 220px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 200px;
  border: 1px solid #ccc;
  background: #f7f7f7;

  .clear-button {
    position: absolute;
    right: 3px;
    top: 2px;
    background-color: #f9fafb;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ddd;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.2),
      0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }

  img {
    object-fit: scale-down;
  }

  .upload-progress {
    width: 90%;
  }

  .caption-text-wrapper {
    margin-top: auto;
    padding-top: 0.6rem;
  }

  .caption-text-area {
    resize: none;

    &::placeholder {
      color: #bbb;
    }
  }

  .error-message {
    color: var(--danger);
  }
}

.file-inner {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.file-inner-data {
  flex: 1 1 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100%;
  min-height: 1px;
}

.file-link {
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 1px;
}

.file-icon {
  display: block;
  height: 100%;
  width: auto;
}

.file-caption {
  margin-top: 0.5rem;

  .file-name {
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .file-size {
    display: block;
    margin-top: 0.2rem;
    color: #999;
  }
}

.file-image {
  object-fit: contain;
}

.file-tab-list {
  display: flex;
  justify-content: flex-end;

  margin: 0;
  border-bottom: none;

  :deep([data-ui-tab]) {
    border-top: none;
    margin-bottom: 0;

    [data-ui-tab-button] {
      padding: 7px 12px;
      white-space: nowrap;
    }

    &[data-active] {
      background-color: #fff;
      border-top: none;

      [data-ui-tab-button] {
        // border: 1px solid #ccc;
        border-bottom: none;
        padding: 7px 12px;
      }
    }
  }
}

.is-top-divider {
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: -1.125rem;
    left: 1rem;
    right: 1rem;
    height: 1px;
    background-color: #eee;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .header-label {
    margin-right: 20px;
    margin-bottom: 0.5rem;
    min-height: 35px;
    display: flex;
    align-items: flex-end;
  }
}
</style>
