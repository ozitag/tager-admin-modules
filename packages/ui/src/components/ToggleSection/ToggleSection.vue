<template>
  <button
    type="button"
    :class="['title-button', isOpen ? 'collapse' : 'expand']"
    :title="isOpen ? 'Collapse' : 'Expand'"
    @click="toggleOpen"
  >
    <span
      role="img"
      :class="['icon-chevron-right', { 'icon-expand-more': isOpen }]"
    >
      <ChevronRightIcon />
    </span>

    <span class="title">
      {{ label }}
    </span>
  </button>

  <div v-show="isOpen" class="content">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
    openedByDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const isOpen = ref<boolean>(props.openedByDefault);

    return {
      isOpen: isOpen,
      toggleOpen: () => {
        isOpen.value = !isOpen.value;
      },
    };
  },
});
</script>

<style scoped lang="scss">
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
