---
"@tager/admin-ui": patch
---

`FormFieldOptionsSwitcher` больше не объявляет свою копию `OptionsSwitcherOption`

В компоненте лежало второе, независимое объявление того же типа. Когда в
2.0.8 значение варианта стало nullable, копия об этом не узнала, и
экспортируемый `OptionsSwitcherOption` перестал подходить пропу `options`
этого же компонента:

    Type 'OptionsSwitcherOption[]' is not assignable to type
    'OptionsSwitcherOption[]'

Тип теперь импортируется из `OptionsSwitcher.types`.
