import type { FetchStatus, Scopes } from "@tager/admin-services";

import type { LinkType } from "../../typings/common";

type LinkTypeWithScopes = LinkType & {
  scopes?: Scopes;
};

export interface NavigationGridItem {
  name: string;
  url?: string;
  total?: { status: FetchStatus; value: number; url?: string };
  linkList?: Array<LinkTypeWithScopes>;
  width?: number;
  scopes?: Scopes;
}
