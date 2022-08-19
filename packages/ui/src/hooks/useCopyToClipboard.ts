import { onUnmounted, ref, watch, type Ref } from "vue";

function useCopyToClipboard(
  timeout = 300
): [Ref<boolean>, (text: string) => void] {
  const isCopied = ref<boolean>(false);

  function handleCopy(text: string): void {
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        isCopied.value = true;
      })
      .catch(console.error);
  }

  let timeoutId: number | undefined;

  watch(isCopied, (newIsCopied) => {
    if (newIsCopied) {
      timeoutId = window.setTimeout(() => {
        isCopied.value = false;
      }, timeout);
    }
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  return [isCopied, handleCopy];
}

export default useCopyToClipboard;
