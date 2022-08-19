import type { Component } from "@vue/runtime-core";

import type { FileType } from "@tager/admin-services";

import FileAviIcon from "../../icons/file-extensions/FileAviIcon.vue";
import FileCssIcon from "../../icons/file-extensions/FileCssIcon.vue";
import FileCsvIcon from "../../icons/file-extensions/FileCsvIcon.vue";
import FileJsIcon from "../../icons/file-extensions/FileJsIcon.vue";
import FileDocIcon from "../../icons/file-extensions/FileDocIcon.vue";
import FileHtmlIcon from "../../icons/file-extensions/FileHtmlIcon.vue";
import FileMp3Icon from "../../icons/file-extensions/FileMp3Icon.vue";
import FileMp4Icon from "../../icons/file-extensions/FileMp4Icon.vue";
import FilePdfIcon from "../../icons/file-extensions/FilePdfIcon.vue";
import FilePptIcon from "../../icons/file-extensions/FilePptIcon.vue";
import FilePsdIcon from "../../icons/file-extensions/FilePsdIcon.vue";
import FileTxtIcon from "../../icons/file-extensions/FileTxtIcon.vue";
import FileUnknownIcon from "../../icons/file-extensions/FileUnknownIcon.vue";
import FileXlsIcon from "../../icons/file-extensions/FileXlsIcon.vue";
import FileXmlIcon from "../../icons/file-extensions/FileXmlIcon.vue";
import FileZipIcon from "../../icons/file-extensions/FileZipIcon.vue";

function createTypeValidator(file: FileType) {
  return function isValidType(
    mimeTypeList: Array<string>,
    extensionList: Array<string>
  ) {
    return (
      mimeTypeList.some((mimeType) => file.mime.includes(mimeType)) ||
      extensionList.some((ext) => file.name.endsWith(ext))
    );
  };
}

/**
 * Reference:
 * https://github.com/nginx/nginx/blob/master/conf/mime.types
 */
export function getFileIconComponent(file: FileType | null): Component {
  if (!file) return FileUnknownIcon;

  const isValidType = createTypeValidator(file);

  if (isValidType(["video/x-msvideo"], [".avi"])) {
    return FileAviIcon;
  }
  if (isValidType(["text/css"], [".css"])) {
    return FileCssIcon;
  }
  if (isValidType([], [".csv"])) {
    return FileCsvIcon;
  }
  if (
    isValidType(
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      [".doc", ".docx"]
    )
  ) {
    return FileDocIcon;
  }
  if (isValidType(["text/html"], [".html"])) {
    return FileHtmlIcon;
  }
  if (isValidType(["application/javascript"], [".js", ".jsx", ".ts", ".tsx"])) {
    return FileJsIcon;
  }
  if (isValidType(["audio/mpeg"], [".mp3"])) {
    return FileMp3Icon;
  }
  if (isValidType(["video/mp4"], [".mp4"])) {
    return FileMp4Icon;
  }
  if (isValidType(["application/pdf"], [".pdf"])) {
    return FilePdfIcon;
  }
  if (
    isValidType(
      [
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ],
      [".ppt", ".pptx"]
    )
  ) {
    return FilePptIcon;
  }
  if (isValidType([], [".psd"])) {
    return FilePsdIcon;
  }
  if (isValidType(["text/plain"], [".txt"])) {
    return FileTxtIcon;
  }
  if (
    isValidType(
      [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      [".xls", ".xlsx"]
    )
  ) {
    return FileXlsIcon;
  }
  if (isValidType(["text/xml"], [".xml"])) {
    return FileXmlIcon;
  }
  if (isValidType(["application/zip"], [".zip", ".rar", ".tar"])) {
    return FileZipIcon;
  }

  return FileUnknownIcon;
}
