## 0.8.5 (2021-01-13)

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
