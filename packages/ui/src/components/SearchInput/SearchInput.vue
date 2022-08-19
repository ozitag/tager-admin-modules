<template>
  <div class="search">
    <div class="search-field">
      <SearchIcon class="icon-search" />

      <BaseInput
        v-model:value="searchQuery"
        class="search-control"
        type="text"
        v-bind="$attrs"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="computedPlaceholder"
      />

      <span v-if="loading" class="spinner-wrapper">
        <Spinner class="spinner" size="24" />
      </span>

      <button
        v-if="searchQuery && !loading"
        class="button-clear"
        @click="handleClear"
      >
        <CloseIcon class="icon-search-off" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import debounce from "lodash.debounce";

import { useI18n } from "@tager/admin-services";

import BaseInput from "../BaseInput";
import Spinner from "../BaseSpinner";
import SearchIcon from "../../icons/SearchIcon.vue";
import CloseIcon from "../../icons/CloseIcon.vue";

interface Props {
  value: string;
  autocomplete: string;
  placeholder: string;
  disabled: boolean;
  loading: boolean;
}

export default defineComponent({
  name: "SearchInput",
  components: { Spinner, BaseInput, SearchIcon, CloseIcon },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change", "update:value"],
  setup(props: Props, context) {
    const i18n = useI18n();
    const searchQuery = ref<string>(props.value);

    const emitDebouncedChangeEvent = debounce(() => {
      context.emit("change", searchQuery.value);
      context.emit("update:value", searchQuery.value);
    }, 300);

    watch(searchQuery, () => {
      emitDebouncedChangeEvent();
    });

    function handleClear(): void {
      searchQuery.value = "";
    }

    const computedPlaceholder = computed(() => {
      if (props.placeholder) {
        return props.placeholder;
      }
      return `${i18n.t("ui:searchInput.search")}...`;
    });

    return {
      searchQuery,
      computedPlaceholder,
      handleClear,
    };
  },
});
</script>

<style scoped lang="scss">
.search {
  position: relative;
  margin-bottom: 1rem;
}

.search-field {
  position: relative;
}

.search-control {
  padding-left: 2.75rem;
  padding-right: 2.75rem;
}

.button-clear,
.spinner-wrapper {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}

.icon-search {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
  pointer-events: none;
  fill: rgba(0, 0, 0, 0.45);
}

.button-clear {
  --icon-clear-size: 24px;

  display: inline-flex;
  cursor: pointer;
  color: var(--secondary);
  transition: color 0.3s;

  svg {
    width: var(--icon-clear-size);
    height: var(--icon-clear-size);
    fill: var(--secondary);
    transition: fill 0.3s;
  }

  &:hover {
    color: var(--secondary-dark);

    svg {
      fill: var(--secondary-dark);
    }
  }
}

.spinner-wrapper {
  display: inline-flex;
}

.spinner {
  color: var(--secondary);
}
</style>
