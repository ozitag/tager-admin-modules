<template>
  <div class="advanced-search">
    <div class="advanced-search-header">
      <BaseButton class="advanced-search-toggle" @click="handleToggleClick">
        {{ computedToggleLabel }}
        <ExpandLessIcon v-if="isOpen" class="icon-expand-less" />
        <ExpandMoreIcon v-else class="icon-expand-more" />
      </BaseButton>

      <div class="tag-grid">
        <div v-for="(tag, index) of tags" :key="index" class="tag-item">
          <div class="tag" :title="tag.title" @click="handleTagClick(tag)">
            <span class="tag-label"> {{ tag.title }}: {{ tag.label }} </span>
            <CloseIcon class="tag-close" />
          </div>
        </div>
      </div>
    </div>

    <slot v-if="isOpen"></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  ref,
  type SetupContext,
} from "vue";

import { useI18n } from "@tager/admin-services";

import { BaseButton } from "../../../BaseButton";
import type { FilterTagType } from "../../../../typings/common";
import ExpandMoreIcon from "../../../../icons/ExpandMoreIcon.vue";
import ExpandLessIcon from "../../../../icons/ExpandLessIcon.vue";
import CloseIcon from "../../../../icons/CloseIcon.vue";

interface Props {
  tags: Array<FilterTagType>;
  toggleLabel: string;
}

export default defineComponent({
  name: "AdvancedSearch",
  components: {
    BaseButton,
    ExpandMoreIcon,
    ExpandLessIcon,
    CloseIcon,
  },
  props: {
    tags: {
      type: Array as PropType<Props["tags"]>,
      default: () => [],
    },
    toggleLabel: {
      type: String,
      default: "",
    },
  },
  emits: ["click:tag"],
  setup(props: Props, context: SetupContext) {
    const i18n = useI18n();
    const isOpen = ref<boolean>(false);

    function handleToggleClick() {
      isOpen.value = !isOpen.value;
    }

    function handleTagClick(tag: FilterTagType) {
      context.emit("click:tag", tag);
    }

    const computedToggleLabel = computed(() => {
      if (props.toggleLabel) {
        return props.toggleLabel;
      }
      return i18n.t("ui:advancedSearch.toggleLabel");
    });

    return {
      isOpen,
      handleTagClick,
      handleToggleClick,
      computedToggleLabel,
    };
  },
});
</script>

<style scoped lang="scss">
.advanced-search {
  position: relative;
  margin-bottom: 1rem;
}

.advanced-search-header {
  display: flex;
  align-items: flex-start;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .tag-grid {
    --gap: 0.25rem;

    display: flex;
    flex-wrap: wrap;

    margin: calc(-1 * var(--gap));

    .tag-item {
      padding: var(--gap);
    }
  }
}

.advanced-search-toggle {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  white-space: nowrap;

  .icon-expand-more,
  .icon-expand-less {
    width: 20px;
    height: 20px;
    fill: currentColor;
    margin-left: 0.375rem;
  }
}

.tag {
  position: relative;
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  vertical-align: top;
  cursor: pointer;
  background: #eee;
  border: 1px solid transparent;
  border-radius: 0.12rem;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background: #ddd;

    .tag-label {
      text-decoration: line-through;
    }

    .tag-close {
      opacity: 1;
    }
  }

  .tag-label {
    padding: 0.375rem 1.875rem 0.375rem 0.75rem;
    position: relative;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color);
  }

  .tag-close {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    display: flex;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
}
</style>
