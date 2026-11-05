/**
 * Each project supplies its own config file, so the shape stays open --
 * but the keys this library reads itself are declared explicitly.
 */
export interface AppConfig {
  LANGUAGE?: string;
  [key: string]: unknown;
}

class ConfigurationService {
  private config: unknown = null;

  setConfig(config: unknown): void {
    this.config = config;
  }

  getConfig<T = AppConfig>(): T {
    if (!this.config) {
      throw new Error("You are trying to access config, but it is not defined");
    }

    return this.config as T;
  }
}

const configService = new ConfigurationService();

export default configService;
