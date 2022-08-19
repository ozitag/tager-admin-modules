import { FileObjectSchema, type Nullable, z } from "@tager/admin-services";

export const SingleFileInputValueSchema = z.object({
  id: z.string(),
  file: FileObjectSchema,
  caption: z.string().nullable().optional(),
});

export type SingleFileInputValueType = z.infer<
  typeof SingleFileInputValueSchema
>;

export const FileInputValueSchema = z.union([
  SingleFileInputValueSchema,
  z.array(SingleFileInputValueSchema),
]);

export type FileInputValueType = z.infer<typeof FileInputValueSchema>;

export interface UploadingSingleFileInputValueType
  extends SingleFileInputValueType {
  nativeFile: File;
  xhr: XMLHttpRequest;
  status: "UPLOADING" | "ERROR";
  progress: number;
  error: Nullable<string>;
}

export interface TabListType {
  id: string;
  label: string;
}
