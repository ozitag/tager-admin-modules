<template>
  <td class="name-cell">
    <div v-if="state" class="name-wrap">
      <div class="name-block">
        <span v-if="!state.adminLink.url" class="name-text">
          {{ state.adminLink.text }}
          <span v-if="state.adminLink.subtext" class="name-subtext">
            - <span>{{ state.adminLink.subtext }}</span>
          </span>
        </span>
        <component
          :is="shouldUseRouter ? 'router-link' : 'a'"
          v-else
          class="name-text-link"
          :to="shouldUseRouter ? state.adminLink.url : undefined"
          v-bind="adminLinkAttrs"
        >
          {{ state.adminLink.text }}
          <span v-if="state.adminLink.subtext" class="name-subtext">
            - <span>{{ state.adminLink.subtext }}</span>
          </span>
        </component>

        <ul v-if="state.paramList" class="param-list">
          <li v-for="(param, index) in state.paramList" :key="index">
            {{ param.name }}: <b>{{ param.value }}</b>
          </li>
        </ul>
      </div>

      <div v-if="state.websiteLink" class="url-block">
        <a class="url" :href="state.websiteLink.url" target="_blank">
          {{ state.websiteLink.text }}
        </a>
        <BaseButton variant="icon" @click="handleCopy(state.websiteLink.url)">
          <ContentCopyIcon v-if="!isCopied" class="icon-copy" />
          <DoneIcon v-else class="icon-copy" />
        </BaseButton>
      </div>
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import get from "lodash.get";

import { isAbsoluteUrl, isString, z } from "@tager/admin-services";

import type {
  ColumnDefinitionName,
  NameCellValue,
  RowDataDefaultType,
} from "../../../typings/common";
import { LinkSchema } from "../../../constants/schema";
import { cutUrlOrigin } from "../../../utils/common";
import { BaseButton } from "../../BaseButton";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import ContentCopyIcon from "../../../icons/ContentCopyIcon.vue";
import DoneIcon from "../../../icons/DoneIcon.vue";

export const ParamSchema = z.object({ name: z.string(), value: z.string() });

const AdminLinkSchema = LinkSchema.merge(
  z.object({ subtext: z.string().optional() })
);

const NameCellValueObjectSchema = z.object({
  adminLink: AdminLinkSchema,
  websiteLink: LinkSchema.nullable().optional(),
  paramList: z.array(ParamSchema).nullable().optional(),
});

const NameCelValueSchema = z.union([
  /** from `format(...)` */
  NameCellValueObjectSchema,
  /** from `field` */
  z.string(),
  z.null(),
]);

type NameCellValueType = z.infer<typeof NameCelValueSchema>;
type NameCellValueObjectType = z.infer<typeof NameCellValueObjectSchema>;

function isValidNameCellValue(value: unknown): value is NameCellValueType {
  return NameCelValueSchema.safeParse(value).success;
}

interface Props {
  column: ColumnDefinitionName;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent({
  name: "CellName",
  components: { BaseButton, ContentCopyIcon, DoneIcon },
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
  setup(props) {
    const state = computed<NameCellValueObjectType | null>(() => {
      const value = (
        props.column.format
          ? props.column.format({
              row: props.row,
              column: props.column,
              rowIndex: props.rowIndex,
            })
          : get(props.row, props.column.field, null)
      ) as NameCellValue;

      if (!isValidNameCellValue(value) || !value) {
        return null;
      }

      /** from `field` */
      if (isString(value)) {
        return {
          adminLink: { text: value, subtext: "", url: "" },
          websiteLink: null,
          paramList: null,
        };
      }

      return value;
    });

    const modifiedState = computed<NameCellValueObjectType | null>(() => {
      if (!state.value || !state.value.websiteLink) {
        return state.value;
      }

      return {
        ...state.value,
        websiteLink: {
          ...state.value.websiteLink,
          text: cutUrlOrigin(state.value.websiteLink.text),
        },
      };
    });

    const shouldUseRouter = computed<boolean>(() => {
      const isAbsoluteLink = state.value
        ? isAbsoluteUrl(state.value?.adminLink.url ?? "")
        : false;

      return props.column.options?.shouldUseRouter ?? !isAbsoluteLink;
    });

    const adminLinkAttrs = computed<{
      href?: string;
      target: string | undefined;
    }>(() => {
      const shouldOpenNewTab =
        props.column.options?.shouldOpenNewTab ?? !shouldUseRouter.value;

      const attrs: { href?: string; target: string | undefined } = {
        target: shouldOpenNewTab ? "_blank" : undefined,
      };

      const href = !shouldUseRouter.value
        ? undefined
        : modifiedState.value?.adminLink.url;

      /**
       * In some cases `href` attr can override `href` attr in `router-link` component,
       * even if it has value `undefined`.
       * So we decided to not pass `href` attr at all if we don't need it
       */
      if (href) {
        attrs.href = href;
      }

      return attrs;
    });

    const [isCopied, handleCopy] = useCopyToClipboard(500);

    return {
      adminLinkAttrs,
      shouldUseRouter,
      state: modifiedState,
      handleCopy,
      isCopied,
    };
  },
});
</script>

<style scoped lang="scss">
.name-cell {
  height: 100%;
  padding: 0;
}

.name-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.name-block {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem;
  font-weight: bold;

  .name-subtext span {
    font-size: 11px;
  }

  .name-text-link {
    font-weight: bold;
    color: #007bff;
    align-self: flex-start;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}

.url-block {
  font-size: 13px;
  border-top: 1px solid #eee;
  padding: 0.5rem 0.75rem;

  .url {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}

.param-list {
  display: block;
  font-weight: 400;
  font-size: 11px;

  li {
    margin-top: 0.313rem;
  }
}

.icon-copy {
  width: 14px;
  height: 14px;
}
</style>
