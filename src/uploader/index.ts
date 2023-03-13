import { EventEmitter } from "events";
import { get } from "lodash-es";
import deepmerge from "deepmerge";

import { Request } from "./lib/Request";
import { Logger } from "./lib/Logger";
import { LifecyclePlugins } from "./lib/LifecyclePlugins";
import type {
  IConfig,
  IRequest,
  IUploader,
  IHelper,
  IImgInfo,
} from "./interface";
import uploaders from "./plugins/uploader";
import transformers from "./plugins/transformer";
import { Lifecycle } from "./Lifecycle";
import { getLocal, setLocal } from "@/utils";

export class Uploader extends EventEmitter implements IUploader {
  private CONFIG_LOCAL_KEY = "upload_config";
  private config!: IConfig;
  private lifecycle!: Lifecycle;

  Request!: IRequest;
  log!: Logger;
  helper!: IHelper;
  output: IImgInfo[];
  input: any[];

  constructor() {
    super();

    this.output = [];
    this.input = [];
    this.helper = {
      transformer: new LifecyclePlugins("transformer"),
      uploader: new LifecyclePlugins("uploader"),
      beforeTransformPlugins: new LifecyclePlugins("beforeTransformPlugins"),
      beforeUploadPlugins: new LifecyclePlugins("beforeUploadPlugins"),
      afterUploadPlugins: new LifecyclePlugins("afterUploadPlugins"),
    };

    this.initConfig();
    this.init();
  }

  private initConfig() {
    this.config = JSON.parse(
      getLocal(this.CONFIG_LOCAL_KEY) || "{}"
    ) as IConfig;
  }

  private init() {
    this.Request = new Request(this);
    this.log = new Logger(this);

    // 加载内部插件
    uploaders(this).register(this);
    transformers(this).register(this);

    this.lifecycle = new Lifecycle(this);
  }

  private saveConfig(config: IConfig) {
    this.config = config;
    setLocal(this.CONFIG_LOCAL_KEY, config);
  }

  getConfig<T>(name?: string): T {
    if (!name) {
      return this.config as T;
    } else {
      return get(this.config, name);
    }
  }

  setConfig(config: Partial<IConfig>): void {
    this.saveConfig(deepmerge(this.config, config));
  }

  get request(): IRequest["request"] {
    return this.Request.request.bind(this.Request);
  }

  async upload(input: File[]): Promise<IImgInfo[] | Error> {
    const { output } = await this.lifecycle.start(input);
    return output;
  }
}
