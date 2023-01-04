## 1.0.25

## 1.0.43

### Patch Changes

- Updated dependencies [3af1133]
  - @tager/admin-services@1.1.10

## 1.0.42

### Patch Changes

- da384e0: fix crash in BaseNumberInput when value is int

## 1.0.41

### Patch Changes

- ea52f0d: add left slot to FormFooter

## 1.0.40

### Patch Changes

- 378acf9: rename NumberInput to BaseNumberInput, support null value

## 1.0.39

### Patch Changes

- 92c43ed: remove FormNumberInput

## 1.0.38

### Patch Changes

- ddfc768: add no-error-padding for all form-xxx components

## 1.0.37

### Patch Changes

- 597cf44: add no-error mode for FormGroup

## 1.0.36

### Patch Changes

- cc90125: remove template option from OptionsSwitcherTrueFalse

## 1.0.35

### Patch Changes

- 3e3a0e8: add OptionsSwitcherTrueFalse, fix colors for OptionsSwitcher,CountInput

## 1.0.34

### Patch Changes

- f5abe0e: add OptionsSwitcher

## 1.0.33

### Patch Changes

- cf7d42e: add CountInput

## 1.0.32

### Patch Changes

- d511c9a: add minMax input

## 1.0.31

### Patch Changes

- 9cb0256: 1.0.30 - dateinput trigger change/input events only if date is valid

## 1.0.30

### Patch Changes

- 1b41bdf: admin-ui 1.0.29 - add space between toggleselections

## 1.0.29

### Patch Changes

- 7fc760c: Ui 1.0.28 - add date / datetime types for FieldValue, add wrapper for ToggleSection

## 1.0.28

### Patch Changes

- 9be9229: Add Gallery Field Value

## 1.0.27

### Patch Changes

- fde6e1e: add openedByDefault param to ToggleSection

## 1.0.26

### Patch Changes

- 0a10ed3: add ToggleSection component

### Patch Changes

- 7b4b281: Add eye icon

## 1.0.24

### Patch Changes

- 75631f5: Fix `types` field in packed package.json
- Updated dependencies [75631f5]
  - @tager/admin-services@1.1.9

## 1.0.23

### Patch Changes

- 48f9772: Improve patch/restore package scripts.
- Updated dependencies [48f9772]
  - @tager/admin-services@1.1.8

## 2.0.0

### Major Changes

- 6a06568: 1.0.21 - add ability to setup class value for cell dynically

## 1.0.21

### Patch Changes

- 54e4fd2: Update typings in published npm package

## 1.0.20

### Patch Changes

- 130654f: Add `publishConfig` field to `package.json` (again).
- Updated dependencies [130654f]
  - @tager/admin-services@1.1.7

## 1.0.19

### Patch Changes

- a685c8e: Revert adding `publishConfig` field
- Updated dependencies [a685c8e]
  - @tager/admin-services@1.1.6

## 1.0.18

### Patch Changes

- 7d13db9: Add `publishConfig` field to `package.json`
- Updated dependencies [7d13db9]
  - @tager/admin-services@1.1.5

## 0.8.5 (2021-01-13)

#### Features

- Add scrolling to top on page number change in `DataTable` component

#### Fixes

- Fix footer in `DataTable` component, resize it sidebar is opening/closing

## 0.8.4 (2021-01-12)

#### Features

- Add prop `hidePlaceholderOption` in `BaseSelect` component

#### Fixes

- Fix footer position in `DataTable` component

## 0.8.3 (2021-01-12)

(miss-click release)

## 0.8.2 (2021-01-12)

#### Features

- Add `Pagination` component and `usePagination` hook
- Support pagination in `DataTable` component
- Add icon `chevronLeft`

## 0.8.1 (2021-01-06)

#### Fixes

- Fix type of `useDataTable` hook

## 0.8.0 (2021-01-06)

#### Features

- Add `DataTable` component and `useDataTable` hook
- Add `SearchInput` component and `useSearch` hook
- Add `search` icon
- Add utils `getSearchParams` and `getSearchParamByKey`

#### Fixes

- Fix styles of `BaseCheckbox` component

## 0.7.23 (2021-01-04)

#### Features

- rename props of `FormFieldRecommendedLengthInput` component:
  - `lowerLimit` -> `min`
  - `upperLimit` -> `max`
