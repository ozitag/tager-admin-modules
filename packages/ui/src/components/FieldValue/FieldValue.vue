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

    <template v-if="withEdit">
      <button
        v-if="!editActive || !slots.edit"
        class="edit-button"
        @click="onEditClick"
      >
        {{ editLabel || $i18n.t("ui:fieldValue.edit") }}
      </button>
      <div v-else class="edit-container">
        <slot name="edit" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, useSlots } from "vue";

import LoadableImage from "../LoadableImage";
import { formatDate, formatDateTime } from "../../utils/common";
import Nl2Br from "../../components/Nl2Br";

import FieldValueJson from "./сomponents/FieldValueJson.vue";

export default defineComponent({
  name: "FieldValue",
  components: { FieldValueJson, LoadableImage, Nl2Br },
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
  },
  emits: ["edit"],
  setup(_props, context) {
    const slots = useSlots();
    const onEditClick = () => context.emit("edit");

    return {
      slots,
      formatDate,
      formatDateTime,
      onEditClick,
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
    a {
      color: #007bff;
      display: block;

      &:hover {
        color: #0056b3;
        text-decoration: underline;
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

.field .edit-button {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-color);

  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}
</style>
