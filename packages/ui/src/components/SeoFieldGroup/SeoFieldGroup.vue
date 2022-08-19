<template>
  <div class="seo-field-group">
    <FormGroup>
      <InputLabel>{{ $i18n.t("ui:seoFieldGroup.previewAs") }}:</InputLabel>

      <div class="mode-switcher">
        <div class="form-check">
          <input
            id="flexRadioDefault1"
            v-model="modeSwitcher"
            value="desktop"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {{ $i18n.t("ui:seoFieldGroup.desktopGoogleSnippet") }}
          </label>
        </div>

        <div class="form-check">
          <input
            id="flexRadioDefault2"
            v-model="modeSwitcher"
            value="mobile"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            {{ $i18n.t("ui:seoFieldGroup.mobileGoogleSnippet") }}
          </label>
        </div>
      </div>

      <div v-if="modeSwitcher === 'desktop'" class="snippet-preview-desktop">
        <div class="url">{{ getWebsiteOrigin() }}</div>
        <div class="title">{{ shorten(title, 60) }}</div>
        <div class="description">{{ shorten(description, 165) }}</div>
      </div>

      <div v-if="modeSwitcher === 'mobile'" class="snippet-preview-mobile">
        <div class="snippet-preview-mobile-top">
          <div class="url-wrapper">
            <LanguageIcon class="icon" />
            <div class="url">{{ getWebsiteOrigin() }}</div>
          </div>
          <div class="title">{{ shorten(title, 60) }}</div>
        </div>
        <div :class="['description', { 'is-image': !image }]">
          {{ shorten(description, 165) }}
          <img v-if="image" :src="image.file.url" :alt="title" />
        </div>
      </div>
    </FormGroup>

    <FormFieldRecommendedLengthInput
      :value="title"
      :label="computedTitleLabel"
      :error="titleErrorMessage"
      :min="50"
      :max="60"
      :name="titleName"
      @input="handleTitleChange"
    />

    <FormFieldRecommendedLengthInput
      :value="description"
      :label="computedDescriptionLabel"
      :error="descriptionErrorMessage"
      :min="115"
      :max="165"
      type="textarea"
      :name="descriptionName"
      @input="handleDescriptionChange"
    />

    <FormField
      v-if="shouldDisplayKeywords"
      :value="keywords"
      :label="computedKeywordsLabel"
      :error="keywordsErrorMessage"
      :name="keywordsName"
      @input="handleKeywordsChange"
    />

    <FormFieldFileInput
      v-if="shouldDisplayImage"
      :value="image"
      :label="computedImageLabel"
      :error="imageErrorMessage"
      file-type="image"
      :name="imageName"
      :scenario="imageScenario"
      @update:value="handleImageChange"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  ref,
  type SetupContext,
} from "vue";

import { useI18n } from "@tager/admin-services";

import type { SeoChangeEvent } from "../../typings/common";
import { getWebsiteOrigin } from "../../utils/common";
import FormField from "../FormField";
import FormFieldRecommendedLengthInput from "../FormFieldRecommendedLengthInput";
import FormFieldFileInput from "../FormFieldFileInput";
import FormGroup from "../FormGroup.vue";
import InputLabel from "../InputLabel";
import LanguageIcon from "../../icons/LanguageIcon.vue";
import type { SingleFileInputValueType } from "../FileInput/FileInput.types";

interface Props {
  titleLabel: string;
  title: string;
  titleName: string;
  titleErrorMessage: string;

  descriptionLabel: string;
  description: string;
  descriptionName: string;
  descriptionErrorMessage: string;

  shouldDisplayKeywords: boolean;
  keywordsLabel: string;
  keywords: string;
  keywordsName: string;
  keywordsErrorMessage: string;

  shouldDisplayImage: boolean;
  imageLabel: string;
  image: SingleFileInputValueType | null;
  imageName: string;
  imageScenario: string | null;
  imageErrorMessage: string;
}

export default defineComponent({
  name: "SeoFieldGroup",
  components: {
    FormFieldRecommendedLengthInput,
    FormFieldFileInput,
    FormGroup,
    InputLabel,
    FormField,
    LanguageIcon,
  },
  props: {
    titleLabel: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    titleName: {
      type: String,
      default: "pageTitle",
    },
    titleErrorMessage: {
      type: String,
      default: "",
    },
    descriptionLabel: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    descriptionName: {
      type: String,
      default: "pageDescription",
    },
    descriptionErrorMessage: {
      type: String,
      default: "",
    },
    shouldDisplayKeywords: {
      type: Boolean,
      default: false,
    },
    keywordsLabel: {
      type: String,
      default: "",
    },
    keywords: {
      type: String,
      default: "",
    },
    keywordsName: {
      type: String,
      default: "keywords",
    },
    keywordsErrorMessage: {
      type: String,
      default: "",
    },
    shouldDisplayImage: {
      type: Boolean,
      default: true,
    },
    imageLabel: {
      type: String,
      default: "",
    },
    image: {
      type: Object as PropType<SingleFileInputValueType | null>,
      default: null,
    },
    imageName: {
      type: String,
      default: "openGraphImage",
    },
    imageScenario: {
      type: String,
      default: null,
    },
    imageErrorMessage: {
      type: String,
      default: "",
    },
  },
  emits: [
    "change",
    "change:title",
    "change:description",
    "change:keywords",
    "change:image",
  ],
  setup(props: Props, context: SetupContext) {
    const i18n = useI18n();
    const modeSwitcher = ref<string>("desktop");

    function emitChangeEvent(event: Partial<SeoChangeEvent>) {
      const value: SeoChangeEvent = {
        title: props.title,
        description: props.description,
        keywords: props.keywords,
        image: props.image,
        ...event,
      };
      context.emit("change", value);
    }

    function handleTitleChange(value: string) {
      context.emit("change:title", value);
      emitChangeEvent({ title: value });
    }

    function handleDescriptionChange(value: string) {
      context.emit("change:description", value);
      emitChangeEvent({ description: value });
    }

    function handleKeywordsChange(value: string) {
      context.emit("change:keywords", value);
      emitChangeEvent({ keywords: value });
    }

    function handleImageChange(value: SingleFileInputValueType | null) {
      context.emit("change:image", value);
      emitChangeEvent({ image: value });
    }

    function shorten(text: string, length: number) {
      if (text.trim().length > length) {
        return `${text.substring(0, length).trim()}...`;
      }
      return text;
    }

    const computedTitleLabel = computed(() => {
      if (props.titleLabel) {
        return props.titleLabel;
      }
      return i18n.t("ui:seoFieldGroup.titleLabel");
    });

    const computedDescriptionLabel = computed(() => {
      if (props.descriptionLabel) {
        return props.descriptionLabel;
      }
      return i18n.t("ui:seoFieldGroup.descriptionLabel");
    });

    const computedKeywordsLabel = computed(() => {
      if (props.keywordsLabel) {
        return props.keywordsLabel;
      }
      return i18n.t("ui:seoFieldGroup.keywordsLabel");
    });

    const computedImageLabel = computed(() => {
      if (props.imageLabel) {
        return props.imageLabel;
      }
      return i18n.t("ui:seoFieldGroup.imageLabel");
    });

    return {
      shorten,
      modeSwitcher,
      getWebsiteOrigin,
      handleTitleChange,
      handleDescriptionChange,
      handleKeywordsChange,
      handleImageChange,
      computedTitleLabel,
      computedDescriptionLabel,
      computedKeywordsLabel,
      computedImageLabel,
    };
  },
});
</script>

<style scoped lang="scss">
.mode-switcher {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.form-check {
  display: flex;
  align-items: center;
  min-height: 1.5rem;

  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }

  .form-check-input {
    width: 1em;
    height: 1em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;

    &[type="radio"] {
      border-radius: 50%;
    }

    &:active {
      filter: brightness(90%);
    }

    &:focus {
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    &:checked {
      background-color: #0d6efd;
      border-color: #0d6efd;

      &[type="radio"] {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
      }
    }

    &:disabled {
      pointer-events: none;
      filter: none;
      opacity: 0.5;
    }

    &[disabled] ~ .form-check-label,
    &:disabled ~ .form-check-label {
      opacity: 0.5;
    }
  }

  .form-check-label {
    margin-left: 0.5em;
  }
}

.snippet-preview-desktop {
  .url {
    padding-bottom: 2px;
    padding-top: 1px;
    font-size: 14px;
    line-height: 1.3;
    color: #202124;
    font-family: arial, sans-serif;

    &::after {
      content: "";
      display: inline-block;
      margin-top: 4px;
      margin-left: 6px;
      border-top: 5px solid #70757a;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      vertical-align: top;
    }
  }

  .title {
    color: #1a0dab;
    font-size: 20px;
    line-height: 1.3;
    padding-top: 5px;
    margin-bottom: 3px;
    font-family: arial, sans-serif;

    &:hover {
      text-decoration: underline;
    }
  }

  .description {
    max-width: 48em;
    color: #4d5156;
    line-height: 1.58;
    font-size: 14px;
    font-family: arial, sans-serif;
  }
}

.snippet-preview-mobile {
  border-bottom: 1px hidden rgb(255, 255, 255);
  box-shadow: rgb(32 33 36 / 28%) 0 1px 6px;
  max-width: 400px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 0.75rem 1rem;

  .snippet-preview-mobile-top {
    margin-bottom: 0.75rem;
  }

  .url-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.75rem;
  }

  .url {
    font-size: 0.75rem;
    color: #202124;
    font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  }

  .title {
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    text-transform: none;
    color: #1558d6;
    font-family: Roboto, HelveticaNeue, Arial, sans-serif;

    &:hover {
      text-decoration: underline;
    }
  }

  .description {
    display: grid;
    grid-template-columns: 1fr 104px;
    font-size: 14px;
    line-height: 20px;
    color: #3c4043;
    font-family: Roboto, HelveticaNeue, Arial, sans-serif;

    &.is-image {
      grid-template-columns: none;
    }

    img {
      width: 104px;
      height: 104px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
}
</style>
