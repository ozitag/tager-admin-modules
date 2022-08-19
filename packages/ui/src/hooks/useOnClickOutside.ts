import { onMounted, onUnmounted, type Ref } from "vue";

function useOnClickOutside(
  elementRef: Ref<HTMLElement | null>,
  handler: (event: Event) => void,
  type?: "custom"
): void {
  function handleEvent(event: Event): void {
    if (!elementRef.value) return;

    if (type === "custom") {
      handler(event);
      return;
    }

    const clickedNode = event.target as Node;
    const isSameElement = elementRef.value === clickedNode;
    const isClickedOutside =
      !isSameElement && !elementRef.value.contains(clickedNode);

    if (isClickedOutside) {
      handler(event);
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleEvent);
    document.removeEventListener("touchstart", handleEvent);
  });
}

export default useOnClickOutside;
