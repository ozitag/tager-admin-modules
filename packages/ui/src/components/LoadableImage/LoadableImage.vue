<template>
  <img v-if="status === 'SUCCESS'" loading="lazy" v-bind="$attrs" />

  <div v-else class="image-container" :style="loadingContainerStyle">
    <SpinnerContainer v-if="status === 'LOADING'">
      <spinner size="40" />
    </SpinnerContainer>

    <img
      :style="[{ opacity: 0 }]"
      loading="lazy"
      v-bind="$attrs"
      @load="setStatus('SUCCESS')"
      @error="setStatus('FAILURE')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { FETCH_STATUSES } from "@tager/admin-services";

import Spinner from "../BaseSpinner";
import SpinnerContainer from "../SpinnerContainer.vue";

export default defineComponent({
  name: "LoadableImage",
  components: { Spinner, SpinnerContainer },
  inheritAttrs: false,
  props: {
    loadingContainerStyle: {
      type: [Object, String, Array],
      default: null,
    },
  },
  setup() {
    const status = ref<string>(FETCH_STATUSES.LOADING);

    function setStatus(newStatus: string) {
      status.value = newStatus;
    }

    return {
      status,
      setStatus,
    };
  },
});
</script>

<style scoped lang="scss">
.image-container {
  height: 100%;
  position: relative;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
