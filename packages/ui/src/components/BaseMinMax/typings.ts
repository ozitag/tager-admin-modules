import type { Nullable } from "@tager/admin-services";

export type MinMaxValue = Nullable<{
  min: number | null;
  max: number | null;
}>;
