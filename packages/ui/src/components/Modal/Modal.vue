<template>
  <!-- Телепорт в #popup-target — туда же, куда ComboBox уводит свою выпадашку.
       Без выноса окно остаётся внутри .page-layout-container из
       @tager/admin-layout, а у того position: relative и z-index: 1, то есть
       собственный контекст наложения: снаружи всё окно целиком — слой 1, и
       сайдбар (1000) с шапкой (800) рисуются поверх. Поднимать z-index
       подложки в этом случае бесполезно, за пределы своего контекста он не
       выходит. -->
  <Teleport :to="teleportTarget">
    <div
      v-if="open"
      class="modal-overlay"
      @mousedown="handleOverlayMouseDown"
      @click="handleOverlayClick"
    >
      <div
        ref="dialogRef"
        class="modal-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title ? undefined : ariaLabel"
        :aria-labelledby="title ? titleId : undefined"
        :style="{ maxWidth: width }"
        tabindex="-1"
        @keydown="handleDialogKeyDown"
      >
        <div v-if="hasHeader" class="modal-header">
          <slot name="header">
            <div class="modal-heading">
              <h2 v-if="title" :id="titleId" class="modal-title">
                {{ title }}
              </h2>
              <p v-if="subtitle" class="modal-subtitle">{{ subtitle }}</p>
            </div>
          </slot>

          <button
            v-if="closable"
            type="button"
            class="modal-close"
            :title="closeLabel"
            :aria-label="closeLabel"
            @click="close"
          >
            <CloseIcon class="icon-close" />
          </button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div v-if="$slots['footer']" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";

import { createId, useI18n } from "@tager/admin-services";

import CloseIcon from "../../icons/CloseIcon.vue";

/**
 * Что внутри окна умеет принимать фокус. Видимость здесь не проверяется:
 * единственный надёжный способ — читать геометрию, а она стоит пересчёта
 * раскладки на каждый Tab и в jsdom всегда нулевая.
 */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  '[tabindex]:not([tabindex="-1"])',
  "[contenteditable]",
].join(", ");

/**
 * Стек открытых окон. Esc закрывает только верхнее: вложенное окно (например,
 * подтверждение поверх формы) иначе закрывало бы заодно и то, что под ним.
 * Окно с :close-on-escape="false" тоже попадает в стек — с пустым
 * обработчиком, — чтобы перекрывать нижнее, а не пропускать Esc сквозь себя.
 */
const escapeHandlerStack: Array<() => void> = [];

/** Значение body.style.overflow до того, как его забрало первое окно. */
let savedBodyOverflow = "";

function handleDocumentKeyDown(event: KeyboardEvent): void {
  if (event.key !== "Escape") {
    return;
  }

  const topHandler = escapeHandlerStack[escapeHandlerStack.length - 1];

  if (topHandler) {
    topHandler();
  }
}

function pushEscapeHandler(handler: () => void): void {
  escapeHandlerStack.push(handler);

  if (escapeHandlerStack.length === 1) {
    document.addEventListener("keydown", handleDocumentKeyDown);
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}

function removeEscapeHandler(handler: () => void): void {
  const index = escapeHandlerStack.indexOf(handler);

  if (index === -1) {
    return;
  }

  escapeHandlerStack.splice(index, 1);

  if (escapeHandlerStack.length === 0) {
    document.removeEventListener("keydown", handleDocumentKeyDown);
    document.body.style.overflow = savedBodyOverflow;
  }
}

export default defineComponent({
  /* Многословное имя — требование vue/multi-word-component-names, как у
     BaseTag, который наружу тоже уходит коротким именем. */
  name: "BaseModal",
  components: { CloseIcon },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    /** Любая CSS-ширина: уходит в max-width, по ширине экрана окно ужимается. */
    width: {
      type: String,
      default: "600px",
    },
    /** Крестик в шапке. */
    closable: {
      type: Boolean,
      default: true,
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true,
    },
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    /** Название окна для скринридера, когда заголовка нет или он свой. */
    ariaLabel: {
      type: String,
      default: "Dialog",
    },
  },
  emits: ["close", "update:open"],
  setup(props, { emit, slots }) {
    const i18n = useI18n();
    const dialogRef = ref<HTMLElement | null>(null);
    const titleId = `modal-title-${createId(8)}`;

    /** Узел для телепорта ищется один раз: в index.html он статический. */
    const teleportTarget =
      typeof document !== "undefined" && document.querySelector("#popup-target")
        ? "#popup-target"
        : "body";

    const closeLabel = computed<string>(() => i18n.t("ui:modal.close"));

    const hasHeader = computed<boolean>(
      () =>
        Boolean(props.title) ||
        Boolean(props.subtitle) ||
        Boolean(slots["header"]) ||
        props.closable
    );

    function close(): void {
      emit("update:open", false);
      emit("close");
    }

    /* Esc-обработчик у каждого экземпляра свой: по нему же он снимается со
       стека, поэтому порядок закрытия окон значения не имеет. */
    const escapeHandler = (): void => {
      if (props.closeOnEscape) {
        close();
      }
    };

    let active = false;
    let lastActiveElement: HTMLElement | null = null;

    function activate(): void {
      if (active || typeof document === "undefined") {
        return;
      }

      active = true;
      lastActiveElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      pushEscapeHandler(escapeHandler);

      /* Фокус уводится на само окно, а не на первый элемент внутри: первым
         почти всегда оказывается крестик, и скринридер начинал бы с «закрыть»
         вместо заголовка. С tabindex="-1" окно фокус принимает, а Tab дальше
         идёт по содержимому в обычном порядке. */
      void nextTick(() => dialogRef.value?.focus());
    }

    function deactivate(): void {
      if (!active) {
        return;
      }

      active = false;
      removeEscapeHandler(escapeHandler);

      /* Фокус возвращается на кнопку, которая окно открыла: иначе он
         остаётся на удалённом узле и уезжает в начало страницы. */
      lastActiveElement?.focus();
      lastActiveElement = null;
    }

    /* Подложка ловит клик, а не mousedown: иначе выделение текста внутри окна,
       отпущенное за его краем, читалось бы как «кликнул мимо». Поэтому
       запоминается и начало клика — закрываем, только если оба конца пришлись
       на подложку. */
    let overlayMouseDownTarget: EventTarget | null = null;

    function handleOverlayMouseDown(event: MouseEvent): void {
      overlayMouseDownTarget = event.target;
    }

    function handleOverlayClick(event: MouseEvent): void {
      if (!props.closeOnOverlayClick) {
        return;
      }

      if (
        event.target === event.currentTarget &&
        overlayMouseDownTarget === event.currentTarget
      ) {
        close();
      }
    }

    /** Tab по кругу внутри окна: наружу, под подложку, фокус не уходит. */
    function handleDialogKeyDown(event: KeyboardEvent): void {
      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.value;

      if (!dialog) {
        return;
      }

      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );

      if (items.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    watch(
      () => props.open,
      (open) => (open ? activate() : deactivate()),
      { immediate: true }
    );

    /* Окно могут размонтировать открытым — вместе со страницей при переходе
       по роутеру. Без этого замок скролла остался бы на body навсегда. */
    onBeforeUnmount(deactivate);

    return {
      dialogRef,
      titleId,
      teleportTarget,
      closeLabel,
      hasHeader,
      close,
      handleOverlayMouseDown,
      handleOverlayClick,
      handleDialogKeyDown,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  /* Выше сайдбара (1000) из @tager/admin-layout и ниже тостов (1100):
     сообщение об ошибке должно быть видно поверх открытого окна. */
  z-index: 1050;
  display: flex;
  /* flex-start, хотя окно стоит по центру: центрирование делают auto-поля
     самого окна, см. ниже. */
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.45);
}

.modal-dialog {
  width: 100%;
  /* По центру — auto-полями, а не align-items: center у подложки. Разница
     видна на окне выше экрана: при выравнивании по центру верх вылезает за
     начало прокручиваемой области, и до шапки окна не добраться — браузер не
     умеет прокрутить выше нулевой точки. Auto-поля при нехватке места
     схлопываются в ноль, и окно просто упирается в отступ подложки. */
  margin: auto 0;
  background: var(--white);
  border-radius: 0.25rem;
  box-shadow: 0 10px 45px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-heading {
  min-width: 0;
}

.modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-color);
}

.modal-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--secondary);
}

.modal-close {
  display: inline-flex;
  flex-shrink: 0;
  margin: -0.25rem -0.5rem -0.25rem 0;
  padding: 0.25rem;
  cursor: pointer;

  .icon-close {
    width: 20px;
    height: 20px;
    fill: var(--secondary);
    transition: fill 0.3s;
  }

  &:hover .icon-close {
    fill: var(--text-color);
  }
}

.modal-body {
  padding: 1.5rem;
  color: var(--text-color);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
}
</style>
