import type {
  IUploader,
  IPluginConfig,
  IQiniuConfig,
  IPlugin,
} from "../../interface";

const handle = async (ctx: IUploader) => {
  const userConfig = ctx.getConfig<IQiniuConfig>("bed.qiniu");
  try {
    const imgList = ctx.output;
    console.log(imgList);
    console.log(userConfig);
  } catch (error) {
    ctx.log.error("qiniu plugin upload error: ", error);
  }
};

const config = (ctx: IUploader): IPluginConfig[] => {
  const userConfig = ctx.getConfig<IQiniuConfig>("bed.qiniu") ?? {};

  const config: IPluginConfig[] = [
    {
      name: "accessKey",
      type: "input",
      get alias() {
        return "设定AccessKey";
      },
      default: userConfig.accessKey || "",
      required: true,
    },
    {
      name: "secretKey",
      type: "password",
      get alias() {
        return "设定SecretKey";
      },
      default: userConfig.secretKey || "",
      required: true,
    },
    {
      name: "bucket",
      type: "input",
      get alias() {
        return "设定Bucket";
      },
      default: userConfig.bucket || "",
      required: true,
    },
    {
      name: "url",
      type: "input",
      get prefix() {
        return "设定访问网址";
      },
      get alias() {
        return "设定访问网址";
      },
      get message() {
        return "例如：https://xxx.yyy.glb.clouddn.com";
      },
      default: userConfig.url || "",
      required: true,
    },
    {
      name: "area",
      type: "input",
      get prefix() {
        return "设定存储区域";
      },
      get alias() {
        return "设定存储区域";
      },
      get message() {
        return "例如：z0";
      },
      default: userConfig.area || "",
      required: true,
    },
    {
      name: "options",
      type: "input",
      get prefix() {
        return "设定网址后缀";
      },
      get alias() {
        return "设定网址后缀";
      },
      get message() {
        return "例如：?imageslim";
      },
      default: userConfig.options || "",
      required: false,
    },
    {
      name: "path",
      type: "input",
      get prefix() {
        return "设定存储路径";
      },
      get alias() {
        return "设定存储路径";
      },
      get message() {
        return "例如：test/";
      },
      default: userConfig.path || "",
      required: false,
    },
  ];
  return config;
};

const plugin: IPlugin = {
  name: "七牛云",
  handle,
  config,
};

export default plugin;
