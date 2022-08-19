<template>
  <div class="toasts-container">
    <div class="toasts-inner">
      <Toast
        v-for="toast of toastList"
        :key="toast.id"
        :toast="toast"
        :hidden="toast.hidden"
        @hide:start="markToastAsHidden(toast.id)"
        @hide:finish="hideToast(toast.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useToast, useToastList } from "@tager/admin-services";

import Toast from "./Toast.vue";

export default defineComponent({
  name: "ToastList",
  components: { Toast },
  setup() {
    const toastList = useToastList();
    const toastActions = useToast();

    function markToastAsHidden(toastId: string) {
      toastActions.markAsHidden(toastId);
    }

    function hideToast(toastId: string) {
      toastActions.hide(toastId);
    }

    return { toastList, hideToast, markToastAsHidden };
  },
});
</script>

<style scoped lang="scss">
.toasts-container {
  position: fixed;
  left: 0.5rem;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1100;
}

.toasts-inner {
  position: absolute;
  max-width: 350px;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
}
</style>
