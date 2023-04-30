<template>
  <span
    v-if="visible"
    class="badge"
    :style="{
      background: color,
      color: textColor,
      fontSize: size + 'px',
      display: w100 ? 'block' : 'inline-block',
    }"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseBadge",
  props: {
    w100: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 11,
      required: false,
    },
    color: {
      type: String,
      default: "var(--primary)",
    },
    textColor: {
      type: String,
      default: "#fff",
    },
  },
  setup(_props, { slots }) {
    return { visible: !!slots["default"] };
  },
});
</script>

<style scoped lang="scss">
.badge {
  display: inline-block;
  background: rgba(242, 169, 59, 0.1);
  border-radius: 4px;
  padding: 0.3em 0.6em;
  font-weight: 700;
  font-size: 11px;
  line-height: 120%;
  white-space: nowrap;
}
</style>
