export type TableChangeEvent =
  | { type: "SEARCH_UPDATE"; payload: string }
  | {
      type: "PAGE_NUMBER_UPDATE";
      payload: number;
    }
  | {
      type: "PAGE_SIZE_UPDATE";
      payload: number;
    }
  | {
      type: "SORT_UPDATE";
      payload: string;
    };
