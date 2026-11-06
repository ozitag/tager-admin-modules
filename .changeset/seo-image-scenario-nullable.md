---
"@tager/admin-ui": patch
---

`SeoFieldGroup.imageScenario` объявлен как `Nullable<string>`

Проп стоял как `{ type: String, default: null }` — публичный тип `string`
при дефолте `null`. Это тот же дефект, что исправлен в 2.0.7 для двадцати
других пропов, но этот тогда не попал в список.

Соседние `title`, `description` и `keywords` намеренно оставлены `string`:
у них дефолт `""`, тип ему соответствует, и внутри компонента они везде
используются как строки.

Поймано на переводе admin-blog и admin-pages на линию 2.x.
