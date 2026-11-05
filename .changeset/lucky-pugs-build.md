---
"@tager/admin-tools": minor
"@tager/rollup-plugin-lodash": minor
---

Требуется Node `^20.19.0 || >=22.12.0`; `rollup-plugin-lodash` переведён на Rollup 4

В `optimize-lodash-imports` исправлен возврат `{ code: null }` для файлов без
lodash: Vite на этом падал с `Cannot read properties of null (reading 'includes')`.
