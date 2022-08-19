import { upload } from "@tager/admin-services";

const DEFAULT_OPTIONS = {
  uploadScenario: "content",
};

export class MyUploadAdapter {
  constructor(loader, getOptions) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.request = null;

    this.getOptions = () => {
      const userOptions = typeof getOptions === "function" ? getOptions() : {};
      return { ...DEFAULT_OPTIONS, ...userOptions };
    };
  }

  // Starts the upload process.
  upload() {
    const options = this.getOptions();

    this.request = new XMLHttpRequest();

    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file.then((file) =>
      upload({
        file,
        params: { scenario: options.uploadScenario },
        // Update the loader's progress.
        onProgress: ({ loaded, total }) => {
          this.loader.uploadTotal = total;
          this.loader.uploaded = loaded;
        },
        xhr: this.request,
      }).then((response) => {
        return { default: response.url };
      })
    );
  }

  abort() {
    if (this.request) {
      this.request.abort();
    }
  }
}

function CustomUploadAdapterPlugin(editor, getOptions) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader, getOptions);
  };
}

export function CustomUploadAdapterPluginFactory(
  getUploadAdapterPluginOptions
) {
  return function CustomUploadAdapterPluginWithOptions(editor) {
    return new CustomUploadAdapterPlugin(editor, getUploadAdapterPluginOptions);
  };
}
