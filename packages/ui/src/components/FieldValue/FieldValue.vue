<template>
  <div :class="['field', `field-${type}`]">
    <div v-if="label" class="label">{{ label }}</div>

    <div
      v-if="type === 'text' && text"
      :class="['text', { 'no-label': !label }]"
    >
      {{ text }}
    </div>

    <div
      v-if="type === 'date' && value"
      :class="['text', { 'no-label': !label }]"
    >
      {{ formatDate(new Date(value)) }}
    </div>

    <div
      v-if="type === 'datetime' && value"
      :class="['text', { 'no-label': !label }]"
    >
      {{ formatDateTime(new Date(value)) }}
    </div>

    <div v-if="type === 'json' && text">
      <FieldValueJson :data="text" />
    </div>

    <template v-if="type === 'link' && (text || src)">
      <router-link
        v-if="shouldUseRouter"
        :class="['link', { 'no-label': !label }]"
        :to="src"
      >
        {{ text || src }}
      </router-link>
      <a
        v-else
        :class="['link', { 'no-label': !label }]"
        :href="src"
        target="_blank"
      >
        {{ text || src }}
      </a>
    </template>

    <div
      v-if="type === 'video' && (videoId || src)"
      :class="['video', { 'no-label': !label }]"
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
      :class="['image', { 'no-label': !label }]"
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
      :class="['gallery']"
    >
      <div v-for="item in images" :key="item">
        <LoadableImage :src="item" />
      </div>
    </div>

    <ul
      v-if="type === 'list' && items && items.length > 0"
      :class="['list', { 'no-label': !label }]"
    >
      <li v-for="(item, index) in items" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import LoadableImage from "../LoadableImage";
import { formatDate, formatDateTime } from "../../utils/common";

import FieldValueJson from "./сomponents/FieldValueJson.vue";

export default defineComponent({
  name: "FieldValue",
  components: { FieldValueJson, LoadableImage },
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
        ["text", "link", "video", "image", "list", "json", "gallery"].includes(
          value
        ),
    },
    text: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    shouldUseRouter: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
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
  },
  setup() {
    return {
      formatDate,
      formatDateTime,
    };
  },
});
</script>

<style scoped lang="scss">
.field {
  margin-bottom: 1.5rem;
}

.field-text,
.field-date,
.field-datetime {
  .text {
    margin-top: 0.5rem;
    font-weight: bold;

    &.no-label {
      margin-top: 0;
    }
  }
}

.field-link {
  .link {
    margin-top: 0.5rem;
    color: #007bff;
    font-weight: bold;
    display: block;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    &.no-label {
      margin-top: 0;
    }
  }
}

.field-image {
  .image {
    display: block;
    margin-top: 0.5rem;

    img {
      object-fit: cover;
    }

    &.no-label {
      margin-top: 0;
    }
  }
}

.field-video {
  .video {
    display: block;
    margin-top: 0.5rem;

    iframe {
      border-width: 0;
    }

    &.no-label {
      margin-top: 0;
    }
  }
}

.field-list {
  .list {
    display: block;
    margin-top: 0.5rem;
    padding-left: 27px;
    list-style-type: disc;

    &.no-label {
      margin-top: 0;
    }
  }
}

.field-json {
  label {
    margin-bottom: 0.5rem;
  }

  :deep(.jv-code) {
    padding: 15px;
  }
}

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;

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
</style>
