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
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "BaseBadge",
  props: {
    w100: {
      type: Boolean,
      default: false,
    },
    /*
     * These carry a default, so passing `undefined` is valid Vue: the default
     * applies. `exactOptionalPropertyTypes` only allows that when the prop
     * type spells `undefined` out, hence the explicit PropType.
     */
    size: {
      type: Number as PropType<number | undefined>,
      default: 11,
      required: false,
    },
    color: {
      type: String as PropType<string | undefined>,
      default: "var(--primary)",
    },
    textColor: {
      type: String as PropType<string | undefined>,
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
