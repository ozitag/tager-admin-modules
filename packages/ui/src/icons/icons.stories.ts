import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import IconStoryItem from "./IconStoryItem.vue";
import AddCircleIcon from "./AddCircleIcon.vue";
import ArrowDownwardIcon from "./ArrowDownwardIcon.vue";
import ArrowUpwardIcon from "./ArrowUpwardIcon.vue";
import ArticleIcon from "./ArticleIcon.vue";
import AssignmentIcon from "./AssignmentIcon.vue";
import ChevronLeftIcon from "./ChevronLeftIcon.vue";
import ChevronRightIcon from "./ChevronRightIcon.vue";
import CloseIcon from "./CloseIcon.vue";
import CloudUploadIcon from "./CloudUploadIcon.vue";
import ContentCopyIcon from "./ContentCopyIcon.vue";
import DeleteIcon from "./DeleteIcon.vue";
import DescriptionIcon from "./DescriptionIcon.vue";
import DoneIcon from "./DoneIcon.vue";
import EditIcon from "./EditIcon.vue";
import EmailIcon from "./EmailIcon.vue";
import ExpandLessIcon from "./ExpandLessIcon.vue";
import ExpandMoreIcon from "./ExpandMoreIcon.vue";
import GroupIcon from "./GroupIcon.vue";
import HomeIcon from "./HomeIcon.vue";
import LanguageIcon from "./LanguageIcon.vue";
import MenuIcon from "./MenuIcon.vue";
import NorthIcon from "./NorthIcon.vue";
import OpenInBrowserIcon from "./OpenInBrowserIcon.vue";
import OpenInNewIcon from "./OpenInNewIcon.vue";
import RemoveCircleIcon from "./RemoveCircleIcon.vue";
import SearchIcon from "./SearchIcon.vue";
import SettingsIcon from "./SettingsIcon.vue";
import SmsIcon from "./SmsIcon.vue";
import SouthIcon from "./SouthIcon.vue";
import ViewListIcon from "./ViewListIcon.vue";
import WebIcon from "./WebIcon.vue";
import FileAviIcon from "./file-extensions/FileAviIcon.vue";
import FileCssIcon from "./file-extensions/FileCssIcon.vue";
import FileCsvIcon from "./file-extensions/FileCsvIcon.vue";
import FileDocIcon from "./file-extensions/FileDocIcon.vue";
import FileHtmlIcon from "./file-extensions/FileHtmlIcon.vue";
import FileJsIcon from "./file-extensions/FileJsIcon.vue";
import FileMp3Icon from "./file-extensions/FileMp3Icon.vue";
import FileMp4Icon from "./file-extensions/FileMp4Icon.vue";
import FilePdfIcon from "./file-extensions/FilePdfIcon.vue";
import FilePptIcon from "./file-extensions/FilePptIcon.vue";
import FilePsdIcon from "./file-extensions/FilePsdIcon.vue";
import FileTxtIcon from "./file-extensions/FileTxtIcon.vue";
import FileUnknownIcon from "./file-extensions/FileUnknownIcon.vue";
import FileXlsIcon from "./file-extensions/FileXlsIcon.vue";
import FileXmlIcon from "./file-extensions/FileXmlIcon.vue";
import FileZipIcon from "./file-extensions/FileZipIcon.vue";

export default {
  title: "Icons",
};

const FILE_ICON_COMPONENTS = {
  FileAviIcon,
  FileCsvIcon,
  FileCssIcon,
  FileDocIcon,
  FileHtmlIcon,
  FileJsIcon,
  FileMp3Icon,
  FileMp4Icon,
  FilePdfIcon,
  FilePptIcon,
  FilePsdIcon,
  FileTxtIcon,
  FileUnknownIcon,
  FileXlsIcon,
  FileXmlIcon,
  FileZipIcon,
};

const ICON_COMPONENTS = {
  AddCircleIcon,
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  ArticleIcon,
  AssignmentIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CloudUploadIcon,
  ContentCopyIcon,
  DeleteIcon,
  DescriptionIcon,
  DoneIcon,
  EditIcon,
  EmailIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  GroupIcon,
  HomeIcon,
  LanguageIcon,
  MenuIcon,
  NorthIcon,
  OpenInBrowserIcon,
  OpenInNewIcon,
  RemoveCircleIcon,
  SearchIcon,
  SettingsIcon,
  SmsIcon,
  SouthIcon,
  ViewListIcon,
  WebIcon,
};

export const Default: StoryFn = () =>
  defineComponent({
    components: {
      IconStoryItem,
      ...ICON_COMPONENTS,
      ...FILE_ICON_COMPONENTS,
    },
    setup() {
      return { ICON_COMPONENTS, FILE_ICON_COMPONENTS };
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; justify-content: flex-start;margin-bottom: 30px;">
      
        <IconStoryItem v-for="[iconName, IconComponent] of Object.entries(ICON_COMPONENTS)" :title="iconName">
          <component :is="IconComponent"/>
        </IconStoryItem></div>
      
      <div style="display: flex; flex-wrap: wrap; justify-content: flex-start;">
        <IconStoryItem v-for="[iconName, IconComponent] of Object.entries(FILE_ICON_COMPONENTS)" :title="iconName">
          <component :is="IconComponent"/>
        </IconStoryItem>
      </div>
    `,
  });
