import { onMounted, onUnmounted, ref, type Ref } from "vue";

function useResizeObserver<T extends Element>(
  element: Ref<T | null>,
  callback: () => void | ResizeObserverCallback
): void {
  const observer = ref<ResizeObserver | null>(null);

  onMounted(() => {
    observer.value = new ResizeObserver(callback);

    if (element.value) {
      observer.value.observe(element.value);
    }

    document.body.addEventListener("zoom-changed", callback);
  });

  onUnmounted(() => {
    if (observer.value && element.value) {
      observer.value.unobserve(element.value);
    }

    document.body.removeEventListener("zoom-changed", callback);
  });
}

export default useResizeObserver;
