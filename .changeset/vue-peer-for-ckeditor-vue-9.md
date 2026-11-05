---
"@tager/admin-ui": major
---

Нижняя граница Vue поднята до 3.4

`@ckeditor/ckeditor5-vue` 9, на который перешёл визуальный редактор,
импортирует из Vue `toValue` — он появился в 3.3, а его peer требует 3.4.
Пакет же объявлял `vue: ^3.2.33`, то есть обещал совместимость с версиями,
на которых редактор просто не собирается:

    "toValue" is not exported by "vue/dist/vue.esm-bundler.js",
    imported by "@ckeditor/ckeditor5-vue/dist/ckeditor.js"

Сборка библиотеки этого не ловила: `vue` там внешняя зависимость и в бандл
не попадает. Поймала сборка Storybook, которая собирает всё вместе.
