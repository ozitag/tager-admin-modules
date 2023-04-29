import "./assets/css/index.css";

import smoothscroll from "smoothscroll-polyfill";

import { i18n } from "@tager/admin-services";

import EN from "./locales/en";
import RU from "./locales/ru";

smoothscroll.polyfill();

i18n.addTranslations("en", "ui", EN);
i18n.addTranslations("ru", "ui", RU);

export * from "./components/BaseButton";
export { default as BaseCheckbox } from "./components/BaseCheckbox";
export { default as FormFieldCheckbox } from "./components/FormFieldCheckbox";
export { default as FormField } from "./components/FormField/FormField.vue";
export { default as FormFieldError } from "./components/FormFieldError";
export { default as FormFieldRichTextInput } from "./components/FormFieldRichTextInput";
export { default as BaseInput } from "./components/BaseInput";
export { default as BaseTextArea } from "./components/BaseTextArea";
export { default as BaseRichTextInput } from "./components/BaseRichTextInput";
export { default as InputLabel } from "./components/InputLabel/InputLabel.vue";
export { default as PageTitle } from "./components/PageTitle/PageTitle.vue";
export { default as Spinner } from "./components/BaseSpinner";
export { default as BaseTable } from "./components/BaseTable";
export { default as TableCell } from "./components/BaseTable/components/Cell.vue";
export { default as FormGroup } from "./components/FormGroup.vue";
export { default as FileInput } from "./components/FileInput";
export { default as FormFieldFileInput } from "./components/FormFieldFileInput";
export { default as FormFieldAjaxSelect } from "./components/FormFieldAjaxSelect";
export { default as BaseNumberInput } from "./components/BaseNumberInput";
export { default as ColorInput } from "./components/ColorPicker";
export { default as FormFieldColorInput } from "./components/FormFieldColorPicker";
export { default as MultiSelect } from "./components/MultiSelect";
export { default as FormFieldMultiSelect } from "./components/FormFieldMultiSelect";
export { default as FormFieldUrlAliasInput } from "./components/FormFieldUrlAliasInput";
export * from "./components/NavigationGrid";
export { default as LoadableImage } from "./components/LoadableImage";
export { default as Nl2Br } from "./components/Nl2Br";
export { default as DropdownMenu } from "./components/DropdownMenu";
export { default as BaseSelect } from "./components/BaseSelect";
export { default as FormFieldSelect } from "./components/FormFieldSelect";
export { default as FormFieldSingleSelect } from "./components/FormFieldSingleSelect/FormFieldSingleSelect.vue";
export * from "./components/TabList";
export { default as ButtonField } from "./components/ButtonField";
export { default as DateTimeInput } from "./components/DateTimeInput";
export { default as MapField } from "./components/MapField";
export { default as CountInput } from "./components/CountInput";
export { default as ShortCodeConstructor } from "./components/ShortCodeConstructor";
export { default as CountButton } from "./components/CountButton";
export {
  default as OptionsSwitcher,
  OptionsSwitcherTrueFalse,
  type OptionsSwitcherOption,
} from "./components/OptionsSwitcher";
export {
  default as FormFieldOptionsSwitcher,
  FormFieldOptionsSwitcherTrueFalse,
} from "./components/FormFieldOptionsSwitcher";
export { default as FormFieldRecommendedLengthInput } from "./components/FormFieldRecommendedLengthInput";
export {
  default as DataTable,
  useDataTable,
  AdvancedSearch,
} from "./components/DataTable";
export { default as SearchInput, useSearch } from "./components/SearchInput";
export { default as Pagination, usePagination } from "./components/Pagination";
export {
  default as ComboBox,
  useSelectOptions,
  useSelectOptionsResource,
} from "./components/ComboBox";
export { default as FormFieldComboBox } from "./components/FormFieldComboBox";
export { default as FieldValue } from "./components/FieldValue";
export { default as SeoFieldGroup } from "./components/SeoFieldGroup";
export { default as AjaxSelect } from "./components/AjaxSelect";
export * from "./components/FormFooter";
export { default as ColorSelect } from "./components/ColorSelect";
export { default as Tag } from "./components/Tag";
export { default as Steps } from "./components/Steps";
export { default as FormFieldMessageTemplate } from "./components/FormFieldMessageTemplate";
export { default as Code } from "./components/Code";
export { default as IconBase } from "./components/IconBase";
export { default as ToggleSection } from "./components/ToggleSection";
export {
  default as BaseMinMax,
  type MinMaxValue,
} from "./components/BaseMinMax";
export { default as FormFieldMinMax } from "./components/FormFieldMinMax";

export { default as ToastList } from "./components/Toast/ToastList.vue";

export * from "./utils/common";
export * from "./typings/common";

export { default as useCopyToClipboard } from "./hooks/useCopyToClipboard";
export { default as useOnClickOutside } from "./hooks/useOnClickOutside";
export { default as useResizeObserver } from "./hooks/useResizeObserver";
export { default as useLocalStorage } from "./hooks/useLocalStorage";
export { useSortable } from "./hooks/useSortable";

export * from "./icons/mod";
