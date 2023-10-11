import type { RouteLocationRaw } from "vue-router";

import type { FileType, Nullable, Nullish } from "@tager/admin-services";

export type ShortCodeParamType = {
  readonly name: string;
  readonly label: string;
};

export type LinkType = {
  url: Nullable<string>;
  text: string;
};

export type ShortCodeItemType = {
  readonly name: string;
  readonly params: Array<ShortCodeParamType>;
};

export type BaseOptionValue = string | number | null;

export interface BaseOptionType {
  value: BaseOptionValue;
  label: string;
  disabled?: boolean;
}

export interface OptionType<V extends BaseOptionValue = string>
  extends BaseOptionType {
  value: V;
}

export interface ColorOptionType<V = number> {
  value: V;
  label: string;
  color?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export type DateCellValue = Date | null;
export type ColorCellValue = string | null;
export type StringCellValue = string | null;
export type BooleanCellValue = boolean | null;
export type ImageCellValue = string | null;
export type LinkCellValue = LinkType | string | null;
export type RelationsCellValue = Array<{
  label: string;
  to: RouteLocationRaw;
  quantity: number;
}>;
export type NameCellValue =
  | {
      adminLink: LinkType & { subtext?: string };
      paramList?: Array<{ name: string; value: string }> | null;
      websiteLink?: LinkType | null;
    }
  | string
  | null;
export type KeyValueCellValue = Array<{ key: string; value: string }> | null;
export type FileCellValue = Nullable<FileType>;
export type BadgeCellValue =
  | string
  | {
      label: string;
      color?: string;
      textColor?: string;
    };

export type ColumnType =
  | "string"
  | "boolean"
  | "date"
  | "datetime"
  | "image"
  | "link"
  | "html"
  | "color"
  | "key-value"
  | "file"
  | "json"
  | "relations"
  | "badge";

export type RowDataDefaultType = { [key: string]: unknown };

export type ColumnParamsArg<RowData> = {
  row: RowData;
  column: ColumnDefinition<RowData>;
  rowIndex: number;
};

export type CssClass = string | string[] | object | undefined;

export interface ColumnDefinitionCommon<RowData = RowDataDefaultType> {
  id: number;
  name: string;
  field: string;
  type?: string | ((params: ColumnParamsArg<RowData>) => string);
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: CssClass | ((params: ColumnParamsArg<RowData>) => CssClass);
  width?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: string | object[] | object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headStyle?: string | object[] | object;
  useCustomDataCell?: boolean;
  options?: Record<string, any>;
}

export interface ColumnDefinitionDynamic<RowData = RowDataDefaultType> {
  id: number;
  name: string;
  field: string;
  type: (params: ColumnParamsArg<RowData>) => string;
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: CssClass | ((params: ColumnParamsArg<RowData>) => CssClass);
  width?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: string | object[] | object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headStyle?: string | object[] | object;
  useCustomDataCell?: boolean;
  options?: Record<string, any>;
}

export interface ColumnDefinitionString<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type?: "string";
  noWrap?: boolean;
  formatter?: "phone";
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
}

export interface ColumnDefinitionBoolean<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type?: "boolean";
  view?: "YES_NO" | "TICK";
  trueLabel?: string;
  falseLabel?: string;
  value?: (params: ColumnParamsArg<RowData>) => BooleanCellValue;
}

export interface ColumnDefinitionList<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type?: "list";
}

export interface ColumnDefinitionLink<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "link";
  format?: (params: ColumnParamsArg<RowData>) => LinkCellValue;
  options?: {
    shouldOpenNewTab?: boolean;
    shouldUseRouter?: boolean;
    disableCopyButton?: boolean;
  };
}

export interface ColumnDefinitionRelations<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "relations";
  format: (params: ColumnParamsArg<RowData>) => RelationsCellValue;
}

export interface ColumnDefinitionHtml<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "html";
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
}

export interface ColumnDefinitionImage<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "image";
  format?: (params: ColumnParamsArg<RowData>) => ImageCellValue;
  options?: {
    justifyContent?: string;
  };
}

export interface ColumnDefinitionDate<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "date";
  format?: (params: ColumnParamsArg<RowData>) => DateCellValue;
}

export interface ColumnDefinitionDateTime<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "datetime";
  format?: (params: ColumnParamsArg<RowData>) => DateCellValue;
  options?: {
    ignoreStartOfDayTime?: boolean;
  };
}

export interface ColumnDefinitionColor<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "color";
  format?: (params: ColumnParamsArg<RowData>) => ColorCellValue;
}

export interface ColumnDefinitionName<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "name";
  format?: (params: ColumnParamsArg<RowData>) => NameCellValue;
  options?: {
    shouldOpenNewTab?: boolean;
    shouldUseRouter?: boolean;
    displayFullWebsiteLink?: boolean;
  };
}

export interface ColumnDefinitionKeyValue<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "key-value";
  format?: (params: ColumnParamsArg<RowData>) => KeyValueCellValue;
  options?: {
    view: "column" | "row";
  };
}

export interface ColumnDefinitionFile<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "file";
  format?: (params: ColumnParamsArg<RowData>) => FileCellValue;
}

export interface ColumnDefinitionJson<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "json";
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
}

export interface ColumnDefinitionBadge<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "badge";
  size?: number;
  format?: (params: ColumnParamsArg<RowData>) => BadgeCellValue;
}

export type ColumnDefinition<RowData = RowDataDefaultType> =
  | ColumnDefinitionDynamic<RowData>
  | ColumnDefinitionList<RowData>
  | ColumnDefinitionString<RowData>
  | ColumnDefinitionBoolean<RowData>
  | ColumnDefinitionDate<RowData>
  | ColumnDefinitionDateTime<RowData>
  | ColumnDefinitionImage<RowData>
  | ColumnDefinitionLink<RowData>
  | ColumnDefinitionHtml<RowData>
  | ColumnDefinitionColor<RowData>
  | ColumnDefinitionName<RowData>
  | ColumnDefinitionKeyValue<RowData>
  | ColumnDefinitionFile<RowData>
  | ColumnDefinitionBadge<RowData>
  | ColumnDefinitionJson<RowData>
  | ColumnDefinitionRelations<RowData>;

export type DropdownMenuItemType = {
  type: "button" | "link" | "divider";
  text?: string;
  url?: string;
  onClick?: (event: Event) => void;
  style?: any;
  class?: any;
};

export type SingleFileInputValueType = {
  id: string;
  file: FileType;
  caption?: Nullish<string>;
};

export interface SeoChangeEvent {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  image: SingleFileInputValueType | null;
}

export interface VariableType {
  key: string;
  label: string;
}

export interface FilterTagType {
  value: string;
  label: string;
  name: string;
  title: string;
}

export type EventListener<E extends Event = Event> = (event: E) => void;

/**
 * Source: {@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650}
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;
