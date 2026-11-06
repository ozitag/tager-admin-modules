---
"@tager/admin-ui": patch
---

`PaginationProps` и `SortProps` экспортируются из `DataTable`

Оба типа попадают в публичный тип компонента, но объявлены были без
`export`. Пока пакет не отдавал настоящие типы, это не всплывало; теперь
у потребителей, которые рендерят `DataTable`, генератор деклараций
Vue 3.5 падает:

    error TS4023: Exported variable '__VLS_export' has or is using name
    'PaginationProps' from external module ".../DataTable.vue" but cannot
    be named.

Поймалось на сборке `@tager/admin-administrators`.
