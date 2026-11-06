---
"@tager/admin-ui": patch
---

У `PaginationProps` в `DataTable` появилось поле `disabled`

Объект `pagination` целиком уходит в `<Pagination>` через `v-bind`, где
`disabled` — обычный проп, так что поле работало всегда. Но в типе его не
было, и у потребителей, передающих `:pagination="{ ..., disabled: isLoading }"`,
тайпчек падал:

    error TS2353: Object literal may only specify known properties,
    and 'disabled' does not exist in type 'PaginationProps'.

Так пишут и собственные модули TAGER — например список постов в admin-blog.
