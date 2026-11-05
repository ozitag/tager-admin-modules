---
"@tager/admin-ui": patch
---

Расширены типы пропов, которые были уже, чем реальный контракт компонентов

- `FormField.value` принимает `string | null` и нормализует значение перед
  передачей вниз: раньше `null` доходил до `BaseInput`/`BaseTextArea`, где проп
  объявлен как `String`, то есть был ещё и рантайм-варнинг Vue
- `FormFieldFileInput.value` принимает `null` — `FileInput` под ним уже принимал
  `FileInputValueType | null | undefined`, и `default: null` стоял на самом пропе
- `MultiSelect`/`FormFieldMultiSelect` работают с `OptionType<BaseOptionValue>`
  вместо `OptionType<string>`: значения опций бывают числовыми
- `BaseTable`/`DataTable` принимают `columnDefs` для строки любой формы.
  `ColumnDefinition` контравариантен по `RowData` (`format`/`type`/`class`
  принимают `ColumnParamsArg<RowData>`), поэтому `ColumnDefinition<ConcreteRow>`
  не присваивался `ColumnDefinition<RowDataDefaultType>`

Поведение не меняется, типы только расширяются.
