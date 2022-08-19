import FormFieldRecommendedLengthInput from "./FormFieldRecommendedLengthInput.vue";

export default { title: "FormFieldRecommendedLengthInput" };

export const InputMinLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: "",
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model:value="value" name="email" label="label" type="text" :min="50" />',
});

export const InputMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: "",
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model:value="value" name="text" label="label" type="text" :max="100" />',
});

export const InputMinMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: "",
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model:value="value" name="name" label="label" type="text" :min="50" :max="100" />',
});

export const TextAreaMinMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: "",
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model:value="value" name="description" label="label" type="textarea" :min="65" :max="434" />',
});
