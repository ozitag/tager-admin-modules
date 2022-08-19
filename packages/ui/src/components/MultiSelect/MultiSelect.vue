<template>
  <div class="multi-select">
    <div v-if="searchable" class="search">
      <input
        ref="inputRef"
        v-model="searchQuery"
        class="search-control"
        type="text"
        :placeholder="computedSearchPlaceholder"
      />

      <SearchIcon class="icon-search" />

      <button
        v-if="searchQuery"
        class="btn-clear"
        type="button"
        @click="handleClear"
      >
        <CloseIcon class="icon-clear" />
      </button>
    </div>

    <div v-if="shouldDisplayTags" class="tags-wrapper">
      <div v-if="selectedOptions.length > 0" class="scroll-container">
        <div class="tags">
          <ul ref="tagListRef" class="tag-list">
            <li
              v-for="option in selectedOptions"
              :key="option.value"
              class="tag-item"
            >
              <Tag
                class="tag"
                :closable="true"
                @close="handleTagCloseClick(option)"
              >
                {{ option.label }}
              </Tag>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="no-tags">
        {{ $i18n.t("ui:multiSelect.noSelected") }}
      </div>
    </div>

    <span v-if="maxSelectedCount" class="selected-info">
      {{ $i18n.t("ui:multiSelect.selected") }}:
      <b>{{ selectedOptions.length }}</b
      >, {{ $i18n.t("ui:multiSelect.max") }}: <b>{{ maxSelectedCount }}</b>
    </span>

    <div
      :class="[
        'option',
        'select-all',
        {
          selected: isAllSelected,
        },
      ]"
    >
      <div v-if="!maxSelectedCount" class="option-inner">
        <BaseCheckbox
          :id="`${name}SelectAll`"
          :checked="isAllSelected"
          @change="handleSelectAllChange"
        />
        <label :for="`${name}SelectAll`" class="select-all-label">
          {{ $i18n.t("ui:multiSelect.selectAll") }}
          <span
            >{{ options.length }} {{ $i18n.t("ui:multiSelect.items") }}</span
          >
        </label>
      </div>
    </div>

    <ul v-if="options.length > 0" class="option-list" data-multi-select-list>
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        :class="[
          'option',
          {
            selected: isCheckedOption(option),
            focused: isFocusedOption(option),
            disabled: !isCheckedOption(option) && isMaxSelected,
          },
        ]"
      >
        <div class="option-inner">
          <BaseCheckbox
            :id="`${name}[${index}]`"
            :checked="isCheckedOption(option)"
            @change="(checked, e) => toggleOption(option, e)"
            @focus="handleOptionFocus(option)"
            @blur="handleOptionBlur(option)"
          />
          <label :for="`${name}[${index}]`">
            {{ option.label }}
          </label>
        </div>
      </li>

      <li v-if="filteredOptions.length === 0 && searchQuery" class="no-results">
        {{ $i18n.t("ui:multiSelect.noResultsFound") }}
      </li>
    </ul>
    <div v-else class="empty-block">
      <span>
        {{ $i18n.t("ui:multiSelect.itemsNotFound") }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  type Ref,
  ref,
  type SetupContext,
} from "vue";

import { useI18n } from "@tager/admin-services";

import BaseCheckbox from "../BaseCheckbox";
import Tag from "../Tag";
import { isValidSelectOption } from "../../utils/common";
import type { OptionType } from "../../typings/common";
import CloseIcon from "../../icons/CloseIcon.vue";
import SearchIcon from "../../icons/SearchIcon.vue";
import { useSortable } from "../../hooks/useSortable";

interface Props {
  name: string;
  options: Array<OptionType>;
  selectedOptions: Array<OptionType>;
  searchable: boolean;
  searchPlaceholder: string;
  maxSelectedCount: number;
}

export default defineComponent({
  name: "MultiSelect",
  components: { BaseCheckbox, Tag, CloseIcon, SearchIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    selectedOptions: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: "",
    },
    shouldDisplayTags: {
      type: Boolean,
      default: false,
    },
    maxSelectedCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:selected-options"],
  setup(props: Props, context: SetupContext) {
    const i18n = useI18n();
    const searchQuery = ref<string>("");
    const focusedOption = ref<OptionType | null>(null);
    const inputRef: Ref<HTMLInputElement | null> = ref(null);
    const tagListRef: Ref<HTMLDivElement | null> = ref(null);

    function emitUpdateEvent(newValue: Array<OptionType>) {
      context.emit("update:selected-options", newValue);
    }

    useSortable({
      elementRef: tagListRef,
      entityList: computed(() => props.selectedOptions),
      onChange: emitUpdateEvent,
    });

    function isCheckedOption(option: OptionType) {
      return props.selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
    }

    function isFocusedOption(option: OptionType) {
      return focusedOption.value
        ? focusedOption.value.value === option.value
        : false;
    }

    function toggleOption(option: OptionType, e: Event) {
      const isChecked = isCheckedOption(option);

      if (
        props.maxSelectedCount &&
        props.selectedOptions.length >= props.maxSelectedCount &&
        !isChecked
      ) {
        if (e && e.target) {
          (e.target as HTMLInputElement).checked = false;
        }

        return;
      }

      const newSelectedOptions = isChecked
        ? props.selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : [...props.selectedOptions, option];

      emitUpdateEvent(newSelectedOptions);
    }

    function handleOptionFocus(option: OptionType) {
      if (
        props.maxSelectedCount &&
        props.selectedOptions.length >= props.maxSelectedCount
      ) {
        return;
      }

      focusedOption.value = option;
    }

    function handleOptionBlur(option: OptionType) {
      if (isFocusedOption(option)) {
        focusedOption.value = null;
      }
    }

    const filteredOptions = computed<Array<OptionType>>(() => {
      if (props.searchable && searchQuery.value) {
        return props.options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return props.options;
    });

    function handleClear(): void {
      searchQuery.value = "";
      inputRef.value?.focus();
    }

    function handleTagCloseClick(option: OptionType): void {
      const newSelectedOptions = props.selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      );

      emitUpdateEvent(newSelectedOptions);
    }

    function handleDragAndDropInput(
      sortedSelectedOptions: Array<OptionType>
    ): void {
      emitUpdateEvent(sortedSelectedOptions);
    }

    const isAllSelected = computed<boolean>(
      () => props.options.length === props.selectedOptions.length
    );

    const isMaxSelected = computed<boolean>(() =>
      props.maxSelectedCount
        ? props.selectedOptions.length >= props.maxSelectedCount
        : false
    );

    function handleSelectAllChange(shouldSelectAll: boolean) {
      emitUpdateEvent(shouldSelectAll ? props.options : []);
    }

    const computedSearchPlaceholder = computed(() => {
      if (props.searchPlaceholder) {
        return props.searchPlaceholder;
      }

      return i18n.t("ui:multiSelect.searchPlaceholder");
    });

    return {
      inputRef,
      searchQuery,
      filteredOptions,
      handleClear,
      focusedOption,
      isCheckedOption,
      isFocusedOption,
      toggleOption,
      handleOptionFocus,
      handleOptionBlur,
      handleTagCloseClick,
      handleDragAndDropInput,
      isAllSelected,
      isMaxSelected,
      handleSelectAllChange,
      computedSearchPlaceholder,
      tagListRef,
    };
  },
});
</script>

<style scoped lang="scss">
.multi-select {
  overflow: hidden;
  border: 1px solid var(--input-border-color);
  border-radius: 3px;
}

.option-list {
  max-height: 250px;

  /** Custom Scrollbars **/
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }

  /* Works on Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 147, 153, 0.3) #fff;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    height: 56px;
    background-color: rgba(144, 147, 153, 0.3);

    &:hover {
      background-color: rgba(144, 147, 153, 0.5);
    }
  }
}

.empty-block {
  padding: 2.5rem 1rem;
  text-align: center;
  border-radius: 3px;

  span {
    color: var(--secondary);
  }
}

.option {
  cursor: pointer;
  position: relative;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover,
  &.focused {
    background-color: #d1e3ff;
  }

  &.selected {
    background-color: var(--primary);
    color: white;
  }
}

.option-inner {
  label {
    display: block;
    padding: 0.5rem 0.5rem 0.5rem 1.75rem;
    margin-bottom: 0;
    cursor: pointer;
  }

  input {
    margin: 0.8rem 0 0 0.5rem;
  }

  label {
    transition: box-shadow 0.15s ease-in-out;
  }
}

.checkbox-field {
  margin-bottom: 0;
}

.search {
  position: relative;

  .search-control {
    width: 100%;
    padding: 0.5rem 2.125rem 0.5rem 1.75rem;
    border: 0;
    border-bottom: 1px solid var(--input-border-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: var(--input-color);

    &::placeholder {
      color: var(--input-placeholder-color);
      opacity: 1;
    }
  }

  .icon-search {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translate(0, -50%);
    width: 18px;
    height: 18px;
    fill: var(--secondary);
  }

  .btn-clear {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translate(0, -50%);
    display: flex;

    .icon-clear {
      width: 18px;
      height: 18px;
      fill: var(--secondary);
      transition: fill 0.3s;
    }

    &:hover .icon-clear {
      fill: var(--secondary-dark);
    }
  }
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

.tags-wrapper {
  --tags-height: 43px;

  border-bottom: 1px solid var(--input-border-color);

  .scroll-container {
    display: flex;
    align-items: center;
    height: var(--tags-height);
    padding: 0 0.5rem;
    overflow: hidden;
    overflow-x: scroll;

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.3);

        &:hover {
          background-color: rgba(144, 147, 153, 0.5);
        }
      }
    }

    /* Works on Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(144, 147, 153, 0.3) #fff;

    /* Works on Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
      width: 0.375rem;
      height: 0.375rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .tags {
    margin-bottom: -0.375rem;

    .tag-list {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .tag-item {
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
        padding-right: 0.5rem;
      }
    }
  }

  .no-tags {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    height: var(--tags-height);
    user-select: none;
  }
}

.select-all {
  border-bottom: 1px solid var(--input-border-color);
}

.select-all-label {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.selected-info {
  display: block;
  text-align: right;
  padding: 5px;
}
</style>
