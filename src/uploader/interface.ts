import { EventEmitter } from "events";
import type { Logger } from "./lib/Logger";

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;

type AxiosResponse<T = any, U = any> = import("axios").AxiosResponse<T, U>;

type AxiosRequestConfig<T = any> = import("axios").AxiosRequestConfig<T>;

export type IRequestConfig = AxiosRequestConfig;

export type IResponse<T = any, U = any> = AxiosResponse<T, U>;

export interface IUploader extends EventEmitter {
  log: Logger;
  helper: IHelper;
  /**
   * after transformer, the input will be output
   */
  output: IImgInfo[];
  /**
   * the origin input
   */
  input: File[];
  Request: IRequest;
  request: IRequest["request"];
  getConfig<T>(name?: string): T;
  setConfig(config: Partial<IConfig>): void;
  /**
   * upload image
   */
  upload: (
    input: File[],
    bed: string,
    callback: IUploadPercentCallback
  ) => Promise<IImgInfo[]>;
  getPluginConfigList: () => Array<{
    id: string;
    name: string;
    config: IPluginConfig[];
  }>;
}

export interface IConfig {
  proxy?: string;
  currentBed: string;
  bed: {
    default: IDefaultConfig;
    qiniu?: IQiniuConfig;
  };
}

export interface IRequest {
  request: <T, U extends IRequestConfig = IRequestConfig>(
    config: U
  ) => Promise<IResponse<T, U>>;
}

export interface IPluginConfig {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  alias?: string;
  message?: string;
  prefix?: string; // for cli options
  [propName: string]: any;
}

export type IUploadPercentCallback = (index: number, percent: number) => void;
export interface IPlugin {
  handle:
    | ((ctx: IUploader, callback?: IUploadPercentCallback) => Promise<any>)
    | ((ctx: IUploader, callback?: IUploadPercentCallback) => void);
  /** The name of this handler */
  name: string;
  /** The config of this handler */
  config?: (ctx: IUploader) => IPluginConfig[];
  [propName: string]: any;
}

export interface ILifecyclePlugins {
  register: (id: string, plugin: IPlugin) => void;
  unregister: (id: string) => void;
  getName: () => string;
  get: (id: string) => IPlugin | undefined;
  getList: () => IPlugin[];
  getIdList: () => string[];
}

export interface IHelper {
  transformer: ILifecyclePlugins;
  uploader: ILifecyclePlugins;
  beforeTransformPlugins: ILifecyclePlugins;
  beforeUploadPlugins: ILifecyclePlugins;
  afterUploadPlugins: ILifecyclePlugins;
}

/**
 * for picgo npm plugins
 */
export type IUploaderPlugin = (ctx: IUploader) => IUploaderPluginInterface;

/**
 * interfaces for PicGo plugin
 */
export interface IUploaderPluginInterface {
  /**
   * since PicGo-Core v1.5, register will inject ctx
   */
  register: (ctx: IUploader) => void;
  /**
   * this plugin's config
   */
  config?: (ctx: IUploader) => IPluginConfig[];
  /**
   * register uploader name
   */
  uploader?: string;
  /**
   * register transformer name
   */
  transformer?: string;
  /**
   * for picgo gui plugins
   */
  guiMenu?: (ctx: IUploader) => IGuiMenuItem[];

  /**
   * for picgo gui plugins
   * short key -> command
   */
  commands?: (ctx: IUploader) => ICommandItem[];

  [propName: string]: any;
}

export interface IGuiMenuItem {
  label: string;
  handle: (ctx: IUploader, guiApi: any) => Promise<void>;
}

export interface ICommandItem {
  label: string;
  name: string;
  key: string;
  handle: (ctx: IUploader, guiApi: any) => Promise<void>;
}

export interface IImgInfo {
  file: File;
  // buffer?: Buffer;
  base64Image?: string;
  fileName?: string;
  width?: number;
  height?: number;
  extname?: string;
  imgUrl?: string;
  [propName: string]: any;
}

/** 默认图床配置 */
export interface IDefaultConfig {
  host: string;
}

export interface IQiniuConfig {
  accessKey: string;
  secretKey: string;
  /** 存储空间名 */
  bucket: string;
  /** 自定义域名 */
  url: string;
  /** 存储区域编号 */
  area: "z0" | "z1" | "z2" | "na0" | "as0" | string;
  /** 网址后缀，比如使用 `?imageslim` 可进行[图片瘦身](https://developer.qiniu.com/dora/api/1271/image-thin-body-imageslim) */
  options: string;
  /** 自定义存储路径，比如 `img/` */
  path: string;
}
