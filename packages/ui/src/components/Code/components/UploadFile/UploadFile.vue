<template>
  <div class="upload-file">
    <BaseButton class="button" @click="handleClick"> Upload file </BaseButton>

    <div class="name">{{ name }}</div>

    <input
      ref="inputRef"
      class="file"
      type="file"
      :accept="accept"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type SetupContext } from "vue";

import type { Nullable } from "@tager/admin-services";

import { BaseButton } from "../../../BaseButton";

interface Props {
  accept: string;
}

export default defineComponent({
  name: "UploadFile",
  components: { BaseButton },
  props: {
    accept: {
      type: String,
      default: "text/*",
    },
  },
  emits: ["change"],
  setup(props: Props, context: SetupContext) {
    const inputRef = ref<HTMLInputElement>();
    const file = ref<Nullable<File>>();

    const handleClick = () => {
      inputRef.value?.click();
    };

    const handleFileChange = (event: Event) => {
      file.value = (event.target as HTMLInputElement).files?.[0] ?? null;
      context.emit("change", file.value);
    };

    const name = computed(() =>
      file.value ? file.value.name : "No file selected"
    );

    return {
      inputRef,
      name,
      handleClick,
      handleFileChange,
    };
  },
});
</script>

<style scoped lang="scss">
.upload-file {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  .button {
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    margin-left: 10px;
  }

  .file {
    display: none;
  }
}
</style>
