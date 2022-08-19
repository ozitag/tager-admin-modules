<template>
  <div :class="['field', `field-${type}`]">
    <div v-if="label" class="label">{{ label }}</div>

    <div
      v-if="type === 'text' && text"
      :class="['text', { 'no-label': !label }]"
    >
      {{ text }}
    </div>

    <template v-if="type === 'link' && (text || src)">
      <router-link
        v-if="shouldUseRouter"
        :class="['link', { 'no-label': !label }]"
        :to="src"
      >
        {{ text || src }}
      </router-link>
      <a v-else :class="['link', { 'no-label': !label }]" :href="src">
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
import { defineComponent } from "vue";

import LoadableImage from "../LoadableImage";

interface Props {
  type: "text" | "link" | "video" | "image" | "list";
  text: string | null;
  shouldUseRouter: boolean;
  items: Array<{ title: string }> | null;
  src: string | null;
  alt: string;
  maxWidth: number;
  maxHeight: number;
  videoId: string | null;
}

export default defineComponent({
  name: "FieldValue",
  components: { LoadableImage },
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator: (value: string) =>
        ["text", "link", "video", "image", "list"].includes(value),
    },
    text: {
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
});
</script>

<style scoped lang="scss">
.field {
  margin-bottom: 1.5rem;
}

.field-text {
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
</style>
