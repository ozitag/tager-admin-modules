import type { FileType, Nullable } from "@tager/admin-services";

export type ShortCodeParamType = {
  readonly name: string;
  readonly label: string;
};

export type LinkType = {
  url: string;
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
export type ImageCellValue = string | null;
export type LinkCellValue = LinkType | string | null;
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

export type ColumnType =
  | "string"
  | "date"
  | "datetime"
  | "image"
  | "link"
  | "html"
  | "color"
  | "key-value"
  | "file";

export type RowDataDefaultType = { [key: string]: unknown };

export type ColumnParamsArg<RowData> = {
  row: RowData;
  column: ColumnDefinition<RowData>;
  rowIndex: number;
};

export interface ColumnDefinitionCommon<RowData = RowDataDefaultType> {
  id: number;
  name: string;
  field: string;
  type?: string | ((params: ColumnParamsArg<RowData>) => string);
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: any;
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
  class?: any;
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
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
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
  };
}

export interface ColumnDefinitionKeyValue<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "key-value";
  format?: (params: ColumnParamsArg<RowData>) => KeyValueCellValue;
}

export interface ColumnDefinitionFile<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: "file";
  format?: (params: ColumnParamsArg<RowData>) => FileCellValue;
}

export type ColumnDefinition<RowData = RowDataDefaultType> =
  | ColumnDefinitionDynamic<RowData>
  | ColumnDefinitionString<RowData>
  | ColumnDefinitionDate<RowData>
  | ColumnDefinitionDateTime<RowData>
  | ColumnDefinitionImage<RowData>
  | ColumnDefinitionLink<RowData>
  | ColumnDefinitionHtml<RowData>
  | ColumnDefinitionColor<RowData>
  | ColumnDefinitionName<RowData>
  | ColumnDefinitionKeyValue<RowData>
  | ColumnDefinitionFile<RowData>;

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
  caption?: Nullable<string>;
};

export interface SeoChangeEvent {
  title: string;
  description: string;
  keywords: string;
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
