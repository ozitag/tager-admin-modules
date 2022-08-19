<template>
  <ul>
    <li v-for="(option, index) of options" :key="index">
      <DropdownItem :item="option" @click="handleItemClick(option)" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType, type SetupContext } from "vue";

import type { DropdownMenuItemType } from "../../typings/common";

import DropdownItem from "./components/DropdownItem.vue";

interface Props {
  options: Array<DropdownMenuItemType>;
}

export default defineComponent({
  name: "DropdownMenu",
  components: { DropdownItem },
  props: {
    options: {
      type: Array as PropType<Array<DropdownMenuItemType>>,
      default: () => [],
    },
  },
  emits: ["dropdown-item:click"],
  setup(props: Props, context: SetupContext) {
    function handleItemClick(option: DropdownMenuItemType) {
      if (option.type === "divider") return;
      context.emit("dropdown-item:click");
    }

    return {
      handleItemClick,
    };
  },
});
</script>

<style scoped lang="scss">
ul {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
</style>
