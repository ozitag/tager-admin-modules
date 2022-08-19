<template>
  <hr v-if="item.type === 'divider'" class="dropdown-divider" />
  <a
    v-else-if="item.type === 'link'"
    :href="item.url"
    class="dropdown-item"
    @click="handleClick"
  >
    {{ item.text }}
  </a>
  <button v-else class="dropdown-item" @click="handleClick">
    {{ item.text }}
  </button>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useRouter } from "vue-router";

import { isAbsoluteUrl } from "@tager/admin-services";

import type { DropdownMenuItemType } from "../../../typings/common";

interface Props {
  item: DropdownMenuItemType;
}

export default defineComponent({
  name: "DropdownItem",
  props: {
    item: {
      type: Object as PropType<DropdownMenuItemType>,
      required: true,
    },
  },
  emits: ["click"],
  setup(props: Props, context) {
    const router = useRouter();

    function handleClick(event: Event) {
      context.emit("click");

      if (props.item.onClick) {
        props.item.onClick(event);
      }

      if (
        props.item.type === "link" &&
        props.item.url &&
        !isAbsoluteUrl(props.item.url)
      ) {
        event.preventDefault();
        router.push(props.item.url);
      }
    }

    return { handleClick };
  },
});
</script>

<style scoped lang="scss">
.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  transition: none;
  &:focus,
  &:hover {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
.dropdown-divider {
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
  height: 1px;
}
</style>
