export function convertFileToText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const result = reader.result || "";
      resolve(result as string);
    });

    /** {@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText} */
    reader.readAsText(file);
  });
}
