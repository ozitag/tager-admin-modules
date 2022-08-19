import { z } from "@tager/admin-services";

export const MapFieldValueSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
  })
  .nullable();

export type MapFieldValueType = z.infer<typeof MapFieldValueSchema>;

export const ValuePropSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type MapValueType = z.infer<typeof ValuePropSchema>;
