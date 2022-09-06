import { computed, onMounted, onUnmounted, type Ref, ref, watch } from "vue";
import { round } from "lodash-es";

import { getScrollParentElements } from "./BaseTable.utils";

export function useStickyTableHeader(useStickyHeader: boolean): {
  tableRef: Ref<HTMLTableElement | null>;
  tableCloneRef: Ref<HTMLTableElement | null>;
} {
  const firstVerticalScrollParentElementRef = ref<HTMLElement | null>(null);
  const scrollParentElementsRef = ref<Array<HTMLElement>>([]);

  const tableRef = ref<HTMLTableElement | null>(null);
  const tableCloneRef = ref<HTMLTableElement | null>(null);
  const trRef = computed<HTMLTableRowElement | null>(() => {
    if (!tableRef.value) return null;

    return tableRef.value.querySelector("thead tr");
  });
  const trCloneRef = computed<HTMLTableRowElement | null>(() => {
    if (!tableCloneRef.value) return null;

    return tableCloneRef.value.querySelector("thead tr");
  });

  const scrollTop = ref<number>(0);

  const isAbsoluteTop = ref<boolean>(false);
  const isFixed = ref<boolean>(false);
  const isAbsoluteBottom = ref<boolean>(false);

  watch(isAbsoluteTop, (value) => {
    if (tableCloneRef.value && value) {
      tableCloneRef.value.style.position = "absolute";
      tableCloneRef.value.style.top = "0";
      tableCloneRef.value.style.left = "";
      tableCloneRef.value.style.bottom = "";
      tableCloneRef.value.style.opacity = "0";
    }
  });

  watch(isFixed, (value) => {
    if (
      tableCloneRef.value &&
      firstVerticalScrollParentElementRef.value &&
      value
    ) {
      tableCloneRef.value.style.position = "fixed";
      tableCloneRef.value.style.top = `${scrollTop.value}px`;
      tableCloneRef.value.style.bottom = "";
      tableCloneRef.value.style.opacity = "1";
    }
  });

  watch(isAbsoluteBottom, (value) => {
    if (tableCloneRef.value && value) {
      tableCloneRef.value.style.position = "absolute";
      tableCloneRef.value.style.top = "auto";
      tableCloneRef.value.style.left = "";
      tableCloneRef.value.style.bottom = "0";
    }
  });

  function update() {
    if (trRef.value && trCloneRef.value) {
      const widthListThElement: Array<DOMRect["width"]> = [
        ...trRef.value.querySelectorAll("th"),
      ].map((element) => element.getBoundingClientRect().width);

      [...trCloneRef.value.querySelectorAll<HTMLElement>("th")].forEach(
        (element, index) => {
          element.style.width = `${widthListThElement[index]}px`;
        }
      );
    }

    if (tableRef.value && tableCloneRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect();

      const currentWidth = tableCloneRef.value.style.width;
      const newWidth = `${round(tableRect.width, 3)}px`;

      if (currentWidth !== newWidth) {
        tableCloneRef.value.style.width = newWidth;
      }

      const currentLeft = tableCloneRef.value.style.left;
      const newLeft = `${round(tableRect.left, 3)}px`;

      if (newLeft !== currentLeft) {
        tableCloneRef.value.style.left = newLeft;
      }
    }
  }

  function handleScroll() {
    if (
      firstVerticalScrollParentElementRef.value &&
      tableRef.value &&
      trCloneRef.value
    ) {
      const containerRect =
        firstVerticalScrollParentElementRef.value.getBoundingClientRect();
      const tableRect = tableRef.value.getBoundingClientRect();
      const trCloneRect = trCloneRef.value.getBoundingClientRect();

      scrollTop.value = containerRect.top;

      isAbsoluteTop.value = containerRect.top <= tableRect.top;

      isFixed.value =
        containerRect.top >= tableRect.top &&
        containerRect.top + trCloneRect.height <= tableRect.bottom;

      isAbsoluteBottom.value =
        containerRect.top + trCloneRect.height >= tableRect.bottom;
    }
  }

  const rafIdRef = ref<number | null>(null);

  onMounted(() => {
    function updateWithRaf() {
      rafIdRef.value = requestAnimationFrame(() => {
        if (isFixed.value) {
          update();
        }
        updateWithRaf();
      });
    }

    if (useStickyHeader) {
      updateWithRaf();
    }
  });

  onUnmounted(() => {
    if (rafIdRef.value) {
      cancelAnimationFrame(rafIdRef.value);
    }
  });

  onMounted(() => {
    if (useStickyHeader) {
      if (!trRef.value) return;

      const { firstVerticalScrollParentElement, scrollParentElements } =
        getScrollParentElements(trRef.value);

      firstVerticalScrollParentElementRef.value =
        firstVerticalScrollParentElement;
      scrollParentElementsRef.value = scrollParentElements;

      handleScroll();

      scrollParentElementsRef.value.forEach((element) => {
        element.addEventListener("scroll", handleScroll);
      });
    }
  });

  onUnmounted(() => {
    if (useStickyHeader) {
      scrollParentElementsRef.value.forEach((element) => {
        element.removeEventListener("scroll", handleScroll);
      });
    }
  });

  return {
    tableRef,
    tableCloneRef,
  };
}
