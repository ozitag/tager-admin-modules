<template>
  <span :class="{ tag: true, disabled }">
    <slot></slot>
    <button
      v-if="closable"
      :class="{ 'tag-close': true, disabled: disabled }"
      @click="handleCloseClick"
    >
      <CloseIcon class="icon-close" />
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent, type SetupContext } from "vue";

import CloseIcon from "../../icons/CloseIcon.vue";

interface Props {
  closable: boolean;
  disabled: boolean;
}

export default defineComponent({
  name: "BaseTag",
  components: { CloseIcon },
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props: Props, context: SetupContext) {
    function handleCloseClick(event: Event) {
      if (!props.disabled) {
        context.emit("close", event);
      }
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

  &.disabled {
    opacity: 0.75;
  }
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

  &:not(.disabled):hover {
    .icon-close {
      fill: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
