import { DefaultBodyType, rest } from "msw";

import type { ResponseBody } from "@tager/admin-services";

import { brandList, BrandType } from "./fixtures/brand-list";

export const getBrands = rest.get<
  DefaultBodyType,
  { query: string },
  ResponseBody<Array<BrandType>>
>("/admin/brands", (req, res, ctx) => {
  const searchQuery = req.url.searchParams.get("query");

  if (searchQuery) {
    return res(
      ctx.json({
        data: brandList.filter((brand) =>
          brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })
    );
  }

  return res(
    ctx.json({
      data: brandList,
    })
  );
});
