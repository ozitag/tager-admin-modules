import type { Options } from "sortablejs";
import SortableClass from "sortablejs";
import { onBeforeUnmount, onMounted, watch } from "vue";
import type { Ref } from "vue";

import { assert, isNumber } from "@tager/admin-services";

export function useSortable<T>(params: {
  elementRef: Ref<HTMLElement | null>;
  entityList: Ref<Array<T>>;
  onChange: (entityList: Array<T>) => void;
  options?: Options;
}) {
  const { elementRef, entityList, onChange, options } = params;
  let sortable: SortableClass | null = null;

  function handleDragEnd(fromIndex: number, toIndex: number) {
    const movedElement = entityList.value[fromIndex];

    assert(movedElement !== undefined, "Moved element is not found");

    const entityListCopy = [...entityList.value];
    entityListCopy.splice(fromIndex, 1);
    entityListCopy.splice(toIndex, 0, movedElement);
    onChange(entityListCopy);
  }

  function initSortable() {
    if (!elementRef.value) return;

    sortable = new SortableClass(elementRef.value, {
      animation: 200,
      onEnd: (event) => {
        if (!isNumber(event.oldIndex) || !isNumber(event.newIndex)) return;

        handleDragEnd(event.oldIndex, event.newIndex);
      },
      ...options,
    });
  }

  function destroySortable() {
    if (sortable) {
      sortable.destroy();
    }
  }

  watch(elementRef, () => {
    if (elementRef.value) {
      initSortable();
    } else {
      destroySortable();
    }
  });

  onMounted(initSortable);
  onBeforeUnmount(destroySortable);
}
