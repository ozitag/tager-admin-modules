import { upload } from "@tager/admin-services";

const DEFAULT_OPTIONS: Options = {
  uploadScenario: "content",
};

export interface Editor {
  plugins: {
    get(pluginName: string): {
      createUploadAdapter(loader: Loader): MyUploadAdapter;
    };
  };
}

interface Options {
  uploadScenario?: string;
}

interface Loader {
  file: Promise<File>;
  uploaded: number;
  uploadTotal: number;
}

interface GetOptionsFunction {
  (): Options;
}

/**
 * Reference: {@link https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html}
 */
export class MyUploadAdapter {
  loader: Loader;
  request: XMLHttpRequest | null;
  getOptions: GetOptionsFunction;

  constructor(loader: Loader, getOptions: GetOptionsFunction) {
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

    const request = new XMLHttpRequest();
    this.request = request;

    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file.then((file) =>
      upload<{ url: string }>({
        file,
        params: { scenario: options.uploadScenario },
        // Update the loader's progress.
        onProgress: ({ loaded, total }) => {
          this.loader.uploadTotal = total;
          this.loader.uploaded = loaded;
        },
        xhr: request,
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

export function CustomUploadAdapterPluginFactory(
  getUploadAdapterPluginOptions: GetOptionsFunction
) {
  return function CustomUploadAdapterPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: Loader
    ) => {
      return new MyUploadAdapter(loader, getUploadAdapterPluginOptions);
    };
  };
}
