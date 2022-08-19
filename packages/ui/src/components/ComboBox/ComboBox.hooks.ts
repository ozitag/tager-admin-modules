import {
  computed,
  type ComputedRef,
  nextTick,
  onUnmounted,
  ref,
  type Ref,
} from "vue";
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  size,
} from "@floating-ui/dom";

import {
  type FetchStatus,
  type Nullable,
  type ResponseBody,
  useResource,
} from "@tager/admin-services";

import type { OptionType } from "../../typings/common";

export function useSelectOptions<
  EntityType,
  Option extends OptionType<string | number>
>(params: {
  entityList: Ref<Array<EntityType>>;
  fetchEntityList: (params: { query: string }) => Promise<void>;
  convertEntityToOption: (entity: EntityType) => Option;
  minQueryLength?: number | undefined;
}): {
  options: ComputedRef<Array<Option>>;
  noOptionsMessage: ComputedRef<string>;
  handleSearchQueryChange: (query: string) => void;
} {
  const searchQuery = ref("");
  const minQueryLength = params.minQueryLength ?? 3;

  const options = computed<Array<Option>>(() => {
    if (searchQuery.value.length < minQueryLength) {
      return [];
    }

    return params.entityList.value.map(params.convertEntityToOption);
  });

  const noOptionsMessage = computed<string>(() => {
    return searchQuery.value.length < minQueryLength
      ? `The query must be at least ${minQueryLength} characters.`
      : "No results found";
  });

  function handleSearchQueryChange(query: string): void {
    searchQuery.value = query.trim();

    if (searchQuery.value.length >= minQueryLength) {
      params.fetchEntityList({ query: searchQuery.value });
    }
  }

  return { options, noOptionsMessage, handleSearchQueryChange };
}

export function useSelectOptionsResource<
  EntityType,
  Option extends OptionType<string | number>
>(params: {
  fetchEntityList: (requestParams: {
    query: string;
  }) => Promise<ResponseBody<Array<EntityType>>>;
  resourceName?: string;
  convertEntityToOption: (entity: EntityType) => Option;
  minQueryLength?: number;
}): {
  loading: ComputedRef<boolean>;
  options: ComputedRef<Array<Option>>;
  error: Ref<Nullable<string>>;
  noOptionsMessage: ComputedRef<string>;
  handleSearchQueryChange: (query: string) => void;
  fetchEntityList: (params: { query: string }) => Promise<void>;
  status: Ref<FetchStatus>;
} {
  const [fetchEntityList, { loading, data: entityList, error, status }] =
    useResource<Array<EntityType>, undefined, { query: string }>({
      fetchResource: params.fetchEntityList,
      initialValue: [],
      resourceName: params.resourceName,
    });

  const { options, noOptionsMessage, handleSearchQueryChange } =
    useSelectOptions<EntityType, Option>({
      entityList,
      fetchEntityList,
      convertEntityToOption: params.convertEntityToOption,
      minQueryLength: params.minQueryLength,
    });

  return {
    status,
    loading,
    options,
    error,
    noOptionsMessage,
    handleSearchQueryChange,
    fetchEntityList,
  };
}

export function useFloatingPopup(
  referenceRef: Ref<HTMLElement | null>,
  floatingRef: Ref<HTMLElement | null>
): {
  showPopup: () => void;
  hidePopup: () => void;
  popupIsOpen: Ref<boolean>;
} {
  const popupIsOpen = ref(false);

  let stopPositionAutoUpdate: null | (() => void) = null;

  function updatePosition() {
    const referenceElement = referenceRef.value;
    const floatingElement = floatingRef.value;

    if (referenceElement && floatingElement) {
      computePosition(referenceElement, floatingElement, {
        strategy: "absolute",
        middleware: [
          offset(10),
          flip(),
          size({
            apply({ reference }) {
              Object.assign(floatingElement.style, {
                width: `${reference.width}px`,
              });
            },
          }),
        ],
      }).then((position) => {
        const x = Math.round(position.x);
        const y = Math.round(position.y);

        Object.assign(floatingElement.style, {
          left: 0,
          top: 0,
          transform: `translate3d(${x}px,${y}px,0)`,
        });
      });
    }
  }

  async function showPopup() {
    popupIsOpen.value = true;

    await nextTick().then(updatePosition);

    if (referenceRef.value && floatingRef.value) {
      stopPositionAutoUpdate = autoUpdate(
        referenceRef.value,
        floatingRef.value,
        updatePosition
      );
    }
  }

  function hidePopup() {
    popupIsOpen.value = false;

    if (stopPositionAutoUpdate) {
      stopPositionAutoUpdate();
    }
  }

  onUnmounted(() => {
    if (stopPositionAutoUpdate) {
      stopPositionAutoUpdate();
    }
  });

  const popupIsOpenComputed = computed(() => popupIsOpen.value);

  return { showPopup, hidePopup, popupIsOpen: popupIsOpenComputed };
}
