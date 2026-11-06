---
"@tager/admin-ui": patch
---

Пропы, у которых дефолт `null`, наконец объявлены как `Nullable`

Двадцать пропов были объявлены как `{ type: String, default: null }`.
Vue выводит публичный тип из рантайм-объявления, а не из внутреннего
`Props`, поэтому наружу они уходили как `string` — при том, что значение
по умолчанию `null`, и компоненты его прекрасно обрабатывают.

Пока пакет не отдавал настоящие типы, это никого не трогало. Теперь
каждый такой проп заставлял потребителей писать `?? undefined`, причём
пакет не стыковался сам с собой: `useResource` отдаёт
`errorMessage: Ref<Nullable<string>>`, а `DataTable` и `BaseTable`
объявляли проп как `string`.

Затронуты `errorMessage` у `DataTable` и `BaseTable`, `value`, `label` и
`error` у `OptionsSwitcher` и `FormFieldOptionsSwitcher` (включая
`TrueFalse`-варианты), `label`/`error` у `FormFieldMinMax` и
`FormFieldColorPicker`, `scenario` у `FileInput` и `FormFieldFileInput`,
`src` у `FieldValue`, `label` у фильтра по дате.

Нарочно не тронуты пропы, значения которых внутри компонента идут туда,
где `null` недопустим: метки и цвета вариантов у `*TrueFalse` собираются
в `OptionsSwitcherOption` с обязательным `label: string`, а `value` у
`CountInput` уходит в арифметику.
