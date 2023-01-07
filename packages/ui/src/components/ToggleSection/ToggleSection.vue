<template>
  <div class="toggle-section">
    <button
      type="button"
      :class="['title-button', opened ? 'collapse' : 'expand']"
      :title="opened ? 'Collapse' : 'Expand'"
      @click="() => toggle(!opened)"
    >
      <span
        role="img"
        :class="['icon-chevron-right', { 'icon-expand-more': opened }]"
      >
        <ChevronRightIcon />
      </span>

      <span class="title">
        {{ label }}
      </span>
    </button>
    <div v-show="opened" class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import ChevronRightIcon from "../../icons/ChevronRightIcon.vue";

export default defineComponent({
  name: "ToggleSection",
  components: {
    ChevronRightIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle", "update:isOpen"],
  setup(props, { emit }) {
    const opened = ref<boolean>(props.isOpen || false);

    const toggle = (value: boolean) => {
      opened.value = value;
      emit("toggle", value);
      emit("update:isOpen", value);
    };

    watch(
      () => props.isOpen,
      () => (opened.value = props.isOpen || false)
    );

    return {
      opened,
      toggle,
    };
  },
});
</script>

<style scoped lang="scss">
.toggle-section {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.title-button {
  display: inline-flex;
  align-items: center;
  color: inherit;
  margin-left: -0.375rem;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    cursor: pointer;
  }

  &.collapse {
    color: var(--primary);

    .icon-expand-more {
      color: var(--primary);
    }
  }
}

.icon-chevron-right {
  margin-right: 0.375rem;
  color: var(--secondary);
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  svg {
    display: block;
    fill: currentColor;
    will-change: transform;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.24s;
  }

  &.icon-expand-more {
    svg {
      transform: rotate(90deg);
    }
  }
}

.content {
  margin: 1rem 0 2rem 0;
  padding: 0 1.5rem;
}
</style>
