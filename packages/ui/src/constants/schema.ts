import { z } from "@tager/admin-services";

export const LinkSchema = z.object({
  url: z.string(),
  text: z.string(),
});
