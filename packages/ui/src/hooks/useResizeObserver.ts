import { onMounted, onUnmounted, ref, type Ref } from "vue";

function useResizeObserver<T extends Element>(
  element: Ref<T | null>,
  callback: ResizeObserverCallback
): void {
  const observer = ref<ResizeObserver | null>(null);

  onMounted(() => {
    observer.value = new ResizeObserver(callback);

    if (element.value) {
      observer.value.observe(element.value);
    }
  });

  onUnmounted(() => {
    if (observer.value && element.value) {
      observer.value.unobserve(element.value);
    }
  });
}

export default useResizeObserver;
