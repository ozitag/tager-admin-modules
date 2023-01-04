<template>
  <footer class="footer">
    <div class="bottom">
      <slot v-if="slots.left" name="left"></slot>
      <BaseButton v-else class="btn-back" variant="secondary" @click="goBack">
        {{ computedBackLabel }}
      </BaseButton>

      <div v-if="!hideSubmitButtons" class="bottom-right">
        <FormFieldCheckbox
          v-if="isCheckboxVisible"
          v-model:checked="isAnotherCreationEnabled"
          container-class="checkbox"
          name="reset"
          :label="addAnotherLabel || $i18n.t('ui:formFooter.addMore')"
          :disabled="isSubmitting"
        />

        <BaseButton
          class="btn-save"
          variant="primary"
          :loading="isSubmitting"
          :disabled="isSubmitButtonDisabled"
          @click="handleSaveClick"
        >
          {{ computedSubmitLabel }}
        </BaseButton>

        <BaseButton
          v-if="shouldDisplaySaveAndExitButton"
          class="btn-save-and-exit"
          variant="primary"
          :loading="isSubmitting && !isSaveAndExitButtonDisabled"
          :disabled="isSaveAndExitButtonDisabled"
          @click="handleSaveAndExitClick"
        >
          {{ computedSubmitAndExitLabel }}
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useSlots } from "vue";
import { useRouter } from "vue-router";

import { navigateBack, useI18n } from "@tager/admin-services";

import { BaseButton } from "../BaseButton";
import FormFieldCheckbox from "../FormFieldCheckbox";

import type { TagerFormSubmitEvent } from "./FormFooter.types";

interface Props {
  backHref: string;
  backLabel: string;
  submitLabel: string;
  submitAndExitLabel: string;
  isSubmitting: boolean;
  isSubmitButtonDisabled: boolean;
  isCreation: boolean;
  canCreateAnother: boolean;
  hideSubmitButtons: boolean;
}

export default defineComponent({
  name: "FormFooter",
  components: {
    BaseButton,
    FormFieldCheckbox,
  },
  props: {
    backHref: {
      type: String,
      default: "/",
    },
    backLabel: {
      type: String,
      default: "",
    },
    submitLabel: {
      type: String,
      default: "",
    },
    submitAndExitLabel: {
      type: String,
      default: "",
    },
    isSubmitting: Boolean,
    isSubmitButtonDisabled: Boolean,
    addAnotherLabel: {
      type: String,
      default: "",
    },
    isCreation: {
      type: Boolean,
      default: false,
    },
    canCreateAnother: {
      type: Boolean,
      default: false,
    },
    hideSubmitButtons: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit"],
  setup(props: Props, context) {
    const slots = useSlots();

    const i18n = useI18n();
    const router = useRouter();
    const isAnotherCreationEnabled = ref<boolean>(false);

    function emitSubmitEvent(event: TagerFormSubmitEvent) {
      context.emit("submit", event);
    }

    function handleSaveClick() {
      const event: TagerFormSubmitEvent = {
        type:
          props.isCreation && isAnotherCreationEnabled.value
            ? "create_create-another"
            : props.isCreation
            ? "create"
            : "save",
      };

      emitSubmitEvent(event);
    }

    function handleSaveAndExitClick() {
      const event: TagerFormSubmitEvent = {
        type: props.isCreation ? "create_exit" : "save_exit",
      };

      emitSubmitEvent(event);
    }

    const computedSubmitLabel = computed(() => {
      if (props.submitLabel) return props.submitLabel;

      return i18n.t(
        props.isCreation ? "ui:formFooter.create" : "ui:formFooter.save"
      );
    });

    const computedSubmitAndExitLabel = computed(() => {
      if (props.submitAndExitLabel) return props.submitAndExitLabel;

      return i18n.t(
        props.isCreation
          ? "ui:formFooter.createAndExit"
          : "ui:formFooter.saveAndExit"
      );
    });

    const computedBackLabel = computed(() => {
      if (props.backLabel) return props.backLabel;

      return i18n.t("ui:formFooter.back");
    });

    const isCheckboxVisible = computed(
      () => props.isCreation && props.canCreateAnother
    );

    const shouldDisplaySaveAndExitButton = computed(() => {
      const isEditing = !props.isCreation;
      return isEditing || (props.isCreation && props.canCreateAnother);
    });

    const isSaveAndExitButtonDisabled = computed(() => {
      if (props.isCreation && isAnotherCreationEnabled.value) return true;

      return props.isSubmitButtonDisabled;
    });

    function goBack() {
      navigateBack(router, props.backHref);
    }

    return {
      isAnotherCreationEnabled,
      handleSaveClick,
      handleSaveAndExitClick,
      goBack,
      computedBackLabel,
      computedSubmitLabel,
      computedSubmitAndExitLabel,
      isCheckboxVisible,
      shouldDisplaySaveAndExitButton,
      isSaveAndExitButtonDisabled,
      slots,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 8px 15px;
  min-height: 55px;
  background: #fff;
  margin: 0 0 0;
  font-size: 14px;

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .bottom-right {
    }
  }
}

.btn-back,
.btn-save,
.btn-save-and-exit {
  min-width: 100px;
}

.btn-save-and-exit {
  margin-left: 1rem;
}

.checkbox {
  display: inline-block;
  margin: 0 1rem 0 0;
}
</style>
