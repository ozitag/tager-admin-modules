import type { PathParams } from "msw";
import { http, HttpResponse } from "msw";

import type { ResponseBody } from "@tager/admin-services";

import type { BrandType } from "./fixtures/brand-list";
import { brandList } from "./fixtures/brand-list";

export const getBrands = http.get<
  PathParams,
  never,
  ResponseBody<Array<BrandType>>
>("/admin/brands", ({ request }) => {
  const searchQuery = new URL(request.url).searchParams.get("query");

  if (searchQuery) {
    return HttpResponse.json({
      data: brandList.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    });
  }

  return HttpResponse.json({
    data: brandList,
  });
});
