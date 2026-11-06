---
"@tager/admin-ui": patch
---

`SortProps.value` и значения вариантов `OptionsSwitcher` стали nullable

Две несостыковки пакета с самим собой, вскрывшиеся после того, как он стал
отдавать настоящие типы:

- `useDataTable()` отдаёт `sort: Ref<Nullable<string>>` — «сортировка не
  выбрана» это `null`, — а `SortProps.value` был объявлен как `string`.
  Любое `:sort="{ options, value: sortValue }"` не проходило проверку.
- `OptionsSwitcherOption` строился как `OptionType` с дефолтным параметром
  `string`, хотя у компонента есть проп `nullable`, а вариант «не выбрано»
  задаётся буквально как `{ value: null }`. Теперь значение варианта —
  `Nullable<string>`, и такой вариант можно передать.

Поймано на переводе админки skich-backend на новые пакеты.
