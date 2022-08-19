<template>
  <div class="upload-from-url">
    <FormGroup>
      <BaseInput
        v-model:value="url"
        class="form-control"
        name="url"
        type="text"
        :placeholder="
          $i18n.t('ui:uploadFileFromUrlForm.placeholder', {
            url: 'https://site.com/image.jpg',
          })
        "
        :disabled="isLoading"
      />
      <FormFieldError v-if="Boolean(error)">
        {{ error }}
      </FormFieldError>
    </FormGroup>

    <BaseButton
      class="form-button"
      variant="primary"
      :loading="isLoading"
      :disabled="isSubmitButtonDisabled"
      @click="onSubmit"
    >
      {{ $i18n.t("ui:uploadFileFromUrlForm.upload") }}
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";

import {
  getMessageFromError,
  isAbsoluteUrl,
  RequestError,
  useI18n,
} from "@tager/admin-services";

import FormGroup from "../FormGroup.vue";
import BaseInput from "../BaseInput";
import FormFieldError from "../FormFieldError";
import { BaseButton } from "../BaseButton";

import { uploadFileWithUrl } from "./UploadFileFromUrlForm.helpers";

interface Props {
  disabled: boolean;
}

export default defineComponent({
  name: "UploadFileFromUrlForm",
  components: {
    FormGroup,
    BaseInput,
    FormFieldError,
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change"],
  setup(props: Props, context) {
    const i18n = useI18n();
    const url = ref("");
    const isLoading = ref(false);
    const error = ref("");
    const isSubmitButtonDisabled = computed(
      () => !url.value || isLoading.value || props.disabled
    );

    function getUploadErrorMessage(error: Error) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 413:
            return i18n.t("ui:uploadFileFromUrlForm.fileTooLarge");
          case 404:
            return i18n.t("ui:uploadFileFromUrlForm.uploadEndpointIsNotFound");
        }
      }

      return getMessageFromError(error) || "Error";
    }

    function onSubmit() {
      error.value = "";

      if (!isAbsoluteUrl(url.value)) {
        error.value = i18n.t("ui:uploadFileFromUrlForm.invalidUrl");
        return;
      }

      isLoading.value = true;

      uploadFileWithUrl(url.value)
        .then((savedFile) => {
          url.value = "";
          isLoading.value = false;
          context.emit("change", savedFile);
        })
        .catch((e) => {
          isLoading.value = false;
          error.value = getUploadErrorMessage(e);
        });
    }

    return {
      url,
      isLoading,
      error,
      isSubmitButtonDisabled,
      onSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.upload-from-url {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;

  .form-control {
    max-width: 600px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: auto;
  }

  .form-group {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .form-button {
    margin-top: 1.5rem;
    padding: 10px 30px;
  }
}
</style>
