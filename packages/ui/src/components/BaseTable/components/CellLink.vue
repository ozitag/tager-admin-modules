<template>
  <td>
    <div v-if="link" class="url">
      <router-link v-if="shouldUseRouter" :to="link.url" v-bind="linkAttrs">
        {{ decodeURI(link.text) }}
      </router-link>

      <a v-else :href="link.url" v-bind="linkAttrs">
        {{ decodeURI(link.text) }}
      </a>

      <BaseButton
          v-if="shouldUseCopyButton"
          variant="icon"
          title="Copy to clipboard"
          @click="handleCopy(link.url)"
      >
        <ContentCopyIcon v-if="!isCopied" class="icon-copy"/>
        <DoneIcon v-else class="icon-copy"/>
      </BaseButton>
    </div>
  </td>
</template>

<script lang="ts">
import {computed, defineComponent, type PropType} from "vue";
import get from "lodash.get";

import {isAbsoluteUrl} from "@tager/admin-services";

import {LinkSchema} from "../../../constants/schema";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import {BaseButton} from "../../BaseButton";
import type {
  ColumnDefinitionLink,
  LinkCellValue,
  LinkType,
  RowDataDefaultType,
} from "../../../typings/common";
import ContentCopyIcon from "../../../icons/ContentCopyIcon.vue";
import DoneIcon from "../../../icons/DoneIcon.vue";

function isLinkObject(value: unknown): value is LinkType {
  return LinkSchema.safeParse(value).success;
}

interface Props {
  column: ColumnDefinitionLink;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellLink",
  components: {ContentCopyIcon, DoneIcon, BaseButton},
  props: {
    column: {
      type: Object as PropType<Props["column"]>,
      required: true,
    },
    row: {
      type: Object as PropType<Props["row"]>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props) {
    const [isCopied, handleCopy] = useCopyToClipboard(500);

    const link = computed<LinkType | null>(() => {
      const value = (
          props.column.format
              ? props.column.format({
                row: props.row,
                column: props.column,
                rowIndex: props.rowIndex,
              })
              : get(props.row, props.column.field, null)
      ) as LinkCellValue;

      return isLinkObject(value)
          ? value
          : typeof value === "string" && value.trim()
              ? {url: value, text: value}
              : null;
    });

    const isAbsoluteLink = computed(() => {
      return link.value ? isAbsoluteUrl(link.value.url) : false;
    });

    const shouldUseRouter = computed(() => {
      return props.column.options?.shouldUseRouter ?? !isAbsoluteLink.value;
    });

    const shouldUseCopyButton = computed(() => {
      return !props.column.options?.disableCopyButton;
    });

    const linkAttrs = computed(() => {
      const shouldOpenNewTab =
          props.column.options?.shouldOpenNewTab ?? !shouldUseRouter.value;

      return {
        target: shouldOpenNewTab ? "_blank" : undefined,
      };
    });

    return {
      isCopied,
      handleCopy,
      link,
      isAbsoluteLink,
      shouldUseRouter,
      shouldUseCopyButton,
      linkAttrs,
    };
  },
});
</script>

<style scoped lang="scss">
.url {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  button {
    padding: 0.25rem;
    margin-left: 0.5rem;
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

a {
  color: #007bff;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}
</style>
