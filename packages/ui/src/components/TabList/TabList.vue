<template>
  <ul
    data-ui-tab-list
    :class="[
      'tab-list',
      {
        bordered,
        'aligned-right': alignedRight,
      },
    ]"
  >
    <li
      v-for="tab of tabList"
      :key="tab.id"
      :class="['tab', { active: tabId === tab.id, invalid: tab.hasErrors }]"
      data-ui-tab
      :data-active="tabId === tab.id ? true : undefined"
    >
      <button
        class="tab-button"
        type="button"
        data-ui-tab-button
        @click="handleTabClick(tab.id)"
      >
        {{ tab.label }} <span v-if="tab.hasErrors">*</span>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { TabType } from "./TabList.types";

interface Props {
  tabList: Array<TabType>;
  tabId: string;
  bordered: boolean;
  alignedRight: boolean;
}

export default defineComponent({
  name: "TabList",
  props: {
    tabList: {
      type: Array as PropType<Array<TabType>>,
      required: true,
    },
    tabId: {
      type: String,
      required: true,
    },
    bordered: {
      type: Boolean,
      required: false,
    },
    alignedRight: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["update:tab-id"],
  setup(props: Props, context) {
    function handleTabClick(selectedTabId: string) {
      if (props.tabId === selectedTabId) return;

      context.emit("update:tab-id", selectedTabId);
    }

    return {
      handleTabClick,
    };
  },
});
</script>

<style scoped lang="scss">
.tab-list {
  display: flex;
  border-bottom: 1px solid #eee;
  margin: -1rem -1rem 1.5rem -1rem;

  &.aligned-right {
    justify-content: flex-end;

    .tab-button {
      border-left: 1px solid #eee;
    }

    .tab:first-child:not(.active) .tab-button {
      border-left-color: transparent;
    }

    .tab:not(:last-child) .tab-button {
      border-right-color: #eee;
    }

    .tab.active:before {
      right: -1px;
    }

    .tab:last-child {
      .tab-button {
        border-right: 1px solid transparent;
      }
    }

    .tab:last-child.active {
      .tab-button {
        border-right-color: #eee;
      }

      &:before {
        right: 0;
      }
    }

    &.bordered {
      .tab:first-child {
        &:before {
          left: 0 !important;
        }

        .tab-button {
          border-left: 1px solid #eee;
        }
      }

      .tab:last-child {
        &.active:before {
          right: -1px;
        }

        .tab-button {
          border-right: 0 none;
        }
      }
    }
  }

  &:not(.aligned-right) {
    .tab-button {
      border-right: 1px solid #eee;
    }

    .tab.active:before {
      left: -1px;
    }

    .tab:not(:first-child) .tab-button {
      border-left-color: #eee;
    }

    &.bordered {
      .tab:first-child.active:before {
        left: -1px;
      }
    }
  }

  &.bordered {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;

    .tab:first-child .tab-button {
      border-left: 0;
    }

    .tab:first-child.active:before {
      left: -1px;
    }
  }
}

.tab {
  display: block;
  margin-bottom: -1px;
  margin-top: -1px;

  &:not(.active):not(.invalid):hover {
    color: var(--secondary);
  }

  &.active {
    background-color: #fff;
    border-top-color: var(--primary);
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 3px;
      display: block;
      background: var(--primary);
    }

    .tab-button {
      cursor: default;
    }
  }

  &.invalid {
    color: red;
  }
}

.tab-button {
  padding: 0.7rem 2rem;
  color: inherit;
  font-weight: inherit;
}
</style>
