import type { FetchStatus } from "@tager/admin-services";

import type { LinkType } from "../../typings/common";

export interface NavigationGridItem {
  name: string;
  url?: string;
  total?: { status: FetchStatus; value: number; url?: string };
  linkList?: Array<LinkType>;
  width?: number;
}
