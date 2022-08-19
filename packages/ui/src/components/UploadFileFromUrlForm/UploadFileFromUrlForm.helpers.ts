import { type FileType, request } from "@tager/admin-services";

export function uploadFileWithUrl(url: string): Promise<FileType> {
  const formData = new FormData();
  formData.append("url", url);

  return request.post({
    path: "/admin/upload",
    body: formData,
  });
}
