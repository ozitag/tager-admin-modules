<template>
  <div
    :class="['variable', { 'is-copied': isCopied }]"
    :title="$i18n.t('ui:emailTemplate.copy')"
    @click="copyVarTemplate(getKeyTemplate(variable.key))"
  >
    <span class="label">
      <span>{{ variable.label }}</span> -
      <span>{{ getKeyTemplate(variable.key) }}</span>
    </span>
    <span class="copied">{{ $i18n.t("ui:emailTemplate.copied") }}!</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import type { VariableType } from "../../../../typings/common";

interface Props {
  variable: VariableType;
}

export default defineComponent({
  name: "BaseVariable",
  props: {
    variable: {
      type: Object as PropType<VariableType>,
      default: () => ({ label: "", key: "" }),
    },
  },
  setup() {
    const [isCopied, copyVarTemplate] = useCopyToClipboard(500);

    function getKeyTemplate(key: string): string {
      return `{{${key}}}`;
    }

    return {
      isCopied,
      getKeyTemplate,
      copyVarTemplate,
    };
  },
});
</script>

<style scoped lang="scss">
.variable {
  --gap: 0.5rem;

  position: relative;
  margin-top: var(--gap);
  margin-right: var(--gap);
  padding: 0.375rem 0.75rem;
  max-width: 100%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-color);
  background: #eee;
  border-radius: 0.12rem;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background: #ddd;
  }

  .label {
    opacity: 1;
  }

  .copied {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &.is-copied {
    .label {
      opacity: 0;
    }

    .copied {
      opacity: 1;
    }
  }
}
</style>
