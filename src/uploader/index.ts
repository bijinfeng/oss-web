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
  IUploadPercentCallback,
} from "./interface";
import uploaders from "./plugins/uploader";
import transformers from "./plugins/transformer";
import { Lifecycle } from "./Lifecycle";
import { DEFAULT_CONFIG } from "./enum";
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
    const localConfig = getLocal(this.CONFIG_LOCAL_KEY) ?? "{}";
    this.config = { ...DEFAULT_CONFIG, ...JSON.parse(localConfig) };
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

  /**
   * 上传图片
   * @param input 待上传文件
   * @param bed 上传到哪个图床中
   * @returns
   */
  async upload(
    input: File[],
    bed: string,
    callback: IUploadPercentCallback
  ): Promise<IImgInfo[]> {
    const { output } = await this.lifecycle.start(input, bed, callback);
    return output;
  }

  /**
   * 获取所有插件的配置
   */
  getPluginConfigList(): ReturnType<IUploader["getPluginConfigList"]> {
    const idList = this.helper.uploader.getIdList();
    return idList.map((id) => {
      const plugin = this.helper.uploader.get(id)!;
      return {
        id,
        name: plugin?.name,
        config: plugin.config ? plugin.config(this) : [],
      };
    });
  }
}

const uploader = new Uploader();

export default uploader;
