<template>
  <div class="toast-wrapper">
    <div
      :class="['toast', toast.variant, { hidden }]"
      @transitionend="handleHideTransitionEnd"
    >
      <header class="toast-header">
        <strong>{{ toast.title }}</strong>
        <button class="close-button" @click="handleHideRequest">
          <CloseIcon />
        </button>
      </header>

      <div class="toast-body">{{ toast.body }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, type SetupContext } from "vue";

import type { ToastParams } from "@tager/admin-services";

import CloseIcon from "../../icons/CloseIcon.vue";

interface Props {
  toast: ToastParams;
}

export default defineComponent({
  name: "BaseToast",
  components: { CloseIcon },
  props: {
    toast: {
      type: Object as PropType<ToastParams>,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hide:start", "hide:finish"],
  setup(props: Props, context: SetupContext) {
    function handleHideRequest() {
      context.emit("hide:start");
    }

    function handleHideTransitionEnd() {
      context.emit("hide:finish");
    }

    return {
      handleHideRequest,
      handleHideTransitionEnd,
    };
  },
});
</script>

<style scoped lang="scss">
.toast-wrapper {
  display: block;
  position: relative;
  max-width: 350px;
  backface-visibility: hidden;
  background-clip: padding-box;
  z-index: 1;
  border-radius: 0.25rem;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  .toast {
    max-width: 350px;
    overflow: hidden;
    font-size: 0.875rem;
    background-color: hsla(0, 0%, 100%, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    opacity: 1;
    border-radius: 0.25rem;
    transition: opacity 200ms;

    &.hidden {
      opacity: 0;
    }

    &.primary {
      background-color: rgba(230, 242, 255, 0.85);
      border-color: rgba(184, 218, 255, 0.85);
      color: #004085;

      .toast-header {
        color: #004085;
        background-color: rgba(204, 229, 255, 0.85);
        border-bottom-color: rgba(184, 218, 255, 0.85);
      }
    }

    &.secondary {
      background-color: rgba(239, 240, 241, 0.85);
      border-color: rgba(214, 216, 219, 0.85);
      color: #383d41;
      .toast-header {
        color: #383d41;
        background-color: rgba(226, 227, 229, 0.85);
        border-bottom-color: rgba(214, 216, 219, 0.85);
      }
    }

    &.success {
      background-color: rgba(230, 245, 233, 0.85);
      border-color: rgba(195, 230, 203, 0.85);
      color: #155724;

      .toast-header {
        color: #155724;
        background-color: rgba(212, 237, 218, 0.85);
        border-bottom-color: rgba(195, 230, 203, 0.85);
      }
    }

    &.info {
      background-color: rgba(229, 244, 247, 0.85);
      border-color: rgba(190, 229, 235, 0.85);
      color: #0c5460;

      .toast-header {
        color: #0c5460;
        background-color: rgba(209, 236, 241, 0.85);
        border-bottom-color: rgba(190, 229, 235, 0.85);
      }
    }

    &.warning {
      background-color: rgba(255, 249, 231, 0.85);
      border-color: rgba(255, 238, 186, 0.85);
      color: #856404;

      .toast-header {
        color: #856404;
        background-color: rgba(255, 243, 205, 0.85);
        border-bottom-color: rgba(255, 238, 186, 0.85);
      }
    }

    &.danger {
      background-color: rgba(252, 237, 238, 0.85);
      border-color: rgba(245, 198, 203, 0.85);
      color: #721c24;

      .toast-header {
        color: #721c24;
        background-color: rgba(248, 215, 218, 0.85);
        border-bottom-color: rgba(245, 198, 203, 0.85);
      }
    }
  }
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  color: #721c24;
  background-color: rgba(248, 215, 218, 0.85);
  border-bottom-color: rgba(245, 198, 203, 0.85);

  .close-button {
    margin-left: auto;
    padding: 4px;

    &:hover {
      svg {
        fill: #333;
      }
    }

    svg {
      height: 20px;
      width: 20px;
      fill: #666;
      display: block;
    }
  }
}

.toast-body {
  display: block;
  padding: 0.75rem;

  margin-left: auto;
}
</style>
