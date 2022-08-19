<template>
  <span class="tag">
    <slot></slot>
    <button v-if="closable" class="tag-close" @click="handleCloseClick">
      <CloseIcon class="icon-close" />
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent, type SetupContext } from "vue";

import CloseIcon from "../../icons/CloseIcon.vue";

interface Props {
  closable: boolean;
}

export default defineComponent({
  name: "BaseTag",
  components: { CloseIcon },
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props: Props, context: SetupContext) {
    function handleCloseClick(event: Event) {
      context.emit("close", event);
    }

    return {
      handleCloseClick,
    };
  },
});
</script>

<style scoped lang="scss">
.tag {
  --tag-close-size: 16px;

  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  white-space: nowrap;
  padding: 2px 7px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}

.tag-close {
  display: inline-flex;
  margin-left: 2px;

  .icon-close {
    width: var(--tag-close-size);
    height: var(--tag-close-size);
    fill: rgba(0, 0, 0, 0.45);
    transition: fill 0.3s;
  }

  &:hover {
    .icon-close {
      fill: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
