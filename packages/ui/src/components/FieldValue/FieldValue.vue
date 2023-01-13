<template>
  <div :class="['field', `field-${type}`]">
    <div v-if="label" class="label">{{ label }}</div>

    <div class="field-value">
      <template v-if="slots.value">
        <slot name="value"></slot>
      </template>
      <template v-else>
        <Nl2Br v-if="type === 'text' && value" :text="value" />

        <div v-if="type === 'date' && value">
          {{ formatDate(new Date(value)) }}
        </div>

        <div v-if="type === 'datetime' && value">
          {{ formatDateTime(new Date(value)) }}
        </div>

        <div v-if="type === 'json' && value">
          <FieldValueJson :data="value" />
        </div>

        <template v-if="type === 'link' && src">
          <router-link v-if="shouldUseRouter" :to="src">
            {{ src }}
          </router-link>
          <a v-else :href="src" target="_blank">
            {{ src }}
          </a>
        </template>
        <div
          v-if="type === 'video' && (videoId || src)"
          class="video"
          :style="{ height: maxHeight + 'px' }"
        >
          <iframe
            v-if="videoId"
            :src="`https://www.youtube.com/embed/${videoId}`"
            allowfullscreen
            :height="maxHeight"
          ></iframe>

          <video v-if="src" :src="src" controls :height="maxHeight"></video>
        </div>
        <div
          v-if="type === 'image' && src"
          class="image"
          :style="{ height: maxHeight + 'px' }"
        >
          <LoadableImage
            :src="src"
            :style="{ width: maxWidth + 'px', height: maxHeight + 'px' }"
            :alt="alt"
          />
        </div>
        <div
          v-if="type === 'gallery' && images && images.length > 0"
          class="gallery"
        >
          <div v-for="item in images" :key="item">
            <LoadableImage :src="item" />
          </div>
        </div>
        <ul
          v-if="
            type === 'list' && value && Array.isArray(value) && value.length > 0
          "
          class="list"
        >
          <li v-for="(item, index) in value" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
    </div>

    <template v-if="withEdit || footerButtons.length">
      <template v-if="!editActive || !slots.edit">
        <ul class="field-value__buttons">
          <li v-for="button in footerButtons" :key="button.label">
            <BaseButton
              v-if="button.to && button.useRouter"
              :href="button.to"
              :variant="button.variant"
            >
              {{ button.label }}
            </BaseButton>
            <BaseButton
              v-else-if="button.to && button.useRouter === false"
              :href="button.to"
              target="_blank"
              :variant="button.variant"
            >
              {{ button.label }}
            </BaseButton>
            <BaseButton
              v-else-if="button.onClick"
              :variant="button.variant"
              @click="button.onClick"
            >
              {{ button.label }}
            </BaseButton>
          </li>
        </ul>
      </template>
      <div v-else class="edit-container">
        <slot name="edit" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, useSlots } from "vue";

import type { Nullable } from "@tager/admin-services";
import { useI18n } from "@tager/admin-services";

import LoadableImage from "../LoadableImage";
import { formatDate, formatDateTime } from "../../utils/common";
import Nl2Br from "../../components/Nl2Br";
import type { ButtonVariant } from "../BaseButton";
import { BaseButton } from "../BaseButton";

import FieldValueJson from "./сomponents/FieldValueJson.vue";

type FieldValueButtonType = {
  label: string;
  variant: ButtonVariant;
  onClick?: () => void;
  to?: string;
  useRouter?: boolean;
};

export default defineComponent({
  name: "FieldValue",
  components: { FieldValueJson, LoadableImage, Nl2Br, BaseButton },
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<
        | "text"
        | "link"
        | "video"
        | "image"
        | "list"
        | "json"
        | "gallery"
        | "date"
        | "datetime"
      >,
      default: "text",
      validator: (value: string) =>
        [
          "text",
          "link",
          "video",
          "image",
          "list",
          "json",
          "gallery",
          "date",
          "datetime",
        ].includes(value),
    },
    value: {
      type: [Number, String, Array],
    },
    shouldUseRouter: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: "",
    },
    maxWidth: {
      type: Number,
      default: 200,
    },
    maxHeight: {
      type: Number,
      default: 200,
    },
    videoId: {
      type: String,
      default: "",
    },
    withEdit: {
      type: Boolean,
      default: false,
    },
    editLabel: {
      type: String,
      default: null,
    },
    editActive: {
      type: Boolean,
      default: false,
    },
    editLink: {
      type: String,
      default: null,
    },
    editOpenNewTab: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Array as PropType<Array<FieldValueButtonType>>,
      default: null,
    },
  },
  emits: ["edit"],
  setup(props, context) {
    const { t } = useI18n();
    const slots = useSlots();

    const getEditButton = (): Nullable<FieldValueButtonType> => {
      if (!props.withEdit) {
        return null;
      }

      const label = props.editLabel || t("ui:fieldValue.edit");

      if (props.editLink) {
        return {
          label,
          variant: "secondary-link",
          to: props.editLink,
          useRouter: !props.editOpenNewTab,
        };
      }

      return {
        label,
        variant: "secondary-link",
        onClick: () => context.emit("edit"),
      };
    };

    const editButton = getEditButton();
    const defaultButtons: Array<FieldValueButtonType> = props.buttons
      ? props.buttons
      : [];
    const footerButtons: Array<FieldValueButtonType> = editButton
      ? [editButton, ...defaultButtons]
      : defaultButtons;

    return {
      footerButtons,
      slots,
      formatDate,
      formatDateTime,
    };
  },
});
</script>

<style scoped lang="scss">
.field {
  margin-top: 1.5rem;

  &:first-child {
    margin-top: 0;
  }

  .label {
    font-weight: 700;
    font-size: 0.9rem;

    + .field-value {
      margin-top: 0.5rem;
    }
  }

  .field-value {
    :deep(a) {
      border-bottom: 1px solid var(--primary-dark);
      color: var(--primary-dark);
      transition: 0.3s all ease;

      &:hover {
        color: var(--primary);
        border-bottom-color: transparent;
      }
    }
  }
}

.field-image {
  .image {
    display: block;

    img {
      object-fit: cover;
    }
  }
}

.field-video {
  .video {
    display: block;

    iframe {
      border-width: 0;
    }
  }
}

.field-list {
  .list {
    display: block;
    padding-left: 27px;
    list-style-type: disc;
  }
}

.field-json {
  label {
    margin-bottom: 0.35rem;
  }

  :deep(.jv-code) {
    padding: 15px;
  }
}

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  > div {
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

    img {
      max-height: 100%;
    }
  }
}

.field .edit-container {
  border-left: 1px solid var(--input-border-color);
  margin-top: 0.5rem;
  padding: 0.5rem 0 0.5rem 1rem;
}

.field-value__buttons {
  margin-top: 0.35rem;
  display: flex;
  align-items: center;

  > *:not(:first-child) {
    margin-left: 0.85rem;
  }

  .button {
    font-size: 0.85rem;
  }
}
</style>
