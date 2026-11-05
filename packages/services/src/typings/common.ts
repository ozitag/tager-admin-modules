import type { TFunction } from "i18next";

import type { ResponseWithValidationErrorsType } from "../utils/type-guards";

export type ConstantMap<C extends string> = Readonly<Record<C, C>>;
export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type FetchStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";

/*
 * The `any`s below are a deliberate public API surface: these types describe
 * arbitrary caller-supplied payloads and arbitrary parsed JSON. Narrowing them
 * to `unknown` would force every consumer to add casts, so it has to happen
 * in a major release rather than as a lint cleanup.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type QueryParams = { [key: string]: any };
export type BodyParam = { [key: string]: any } | BodyInit;

export type JsonParseResult =
  { [key: string]: any } | Array<any> | number | boolean | null;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type ParsedResponseBody = JsonParseResult | string | null;

export type RequestOptions = {
  path?: string;
  body?: BodyParam;
  params?: QueryParams | undefined;
  absoluteUrl?: string;
  fetchOptions?: RequestInit;
};

export type HttpRequestFunction = <T = ParsedResponseBody>(
  options: RequestOptions
) => Promise<T>;

export type LaravelError = {
  message: string;
  exception: string;
  file: string;
  line: number;
  trace: Array<{
    class: string;
    file: string;
    function: string;
    line: number;
    type: string;
  }>;
};

export interface PaginationMeta {
  page: {
    number: number;
    size: number;
    count: number;
  };
  total: number;
}

// Defaulting these to `unknown` would break `.data` access on every bare
// `ResponseBody` usage -- a major-release change, see the note above.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseBody<Data = any, M = any> = {
  data: Data;
  message?: string;
  meta?: M;
} & Partial<LaravelError> &
  Partial<ResponseWithValidationErrorsType>;

export type LogoConfig = {
  logo?: Nullable<string>;
  label?: Nullable<string>;
  "label-color"?: Nullable<string>;
};

export type AppConfigType = {
  APP_NAME: string;
  TITLE_TEMPLATE: string;
  LANGUAGE: string;
  BRAND: {
    small: LogoConfig;
    large: LogoConfig;
    subtitle?: string;
  };
  SPLASH_SCREEN?: {
    logo?: string;
    background?: string;
    color?: string;
  };
};

export type TranslateFunction = TFunction;
