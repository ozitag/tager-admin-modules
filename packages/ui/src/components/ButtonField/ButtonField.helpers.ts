import { z } from "@tager/admin-services";

export const ButtonFieldValueSchema = z
  .object({
    label: z.string().nullable(),
    link: z.string().nullable(),
    isNewTab: z.boolean(),
  })
  .nullable();

export type ButtonFieldValueType = z.infer<typeof ButtonFieldValueSchema>;
