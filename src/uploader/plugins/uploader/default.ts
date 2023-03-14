import type {
  IUploader,
  IPluginConfig,
  IDefaultConfig,
  IPlugin,
} from "../../interface";

interface DefaultResData {
  data: { url: string };
}

const handle = async (ctx: IUploader) => {
  const defaultConfig = ctx.getConfig<IDefaultConfig>("bed.default") ?? {};
  try {
    const imgList = ctx.output;
    for (const img of imgList) {
      const formData = new FormData();
      formData.append("myFile", img.file);
      const res = await ctx.request<DefaultResData>({
        baseURL: defaultConfig.host,
        url: "/upload_file",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.data.url) {
        img.imgUrl = res.data.data.url;
      }
    }
  } catch (error) {
    ctx.log.error("default plugin upload error: ", error);
  }
};

const config = (ctx: IUploader): IPluginConfig[] => {
  const defaultConfig = ctx.getConfig<IDefaultConfig>("bed.default") ?? {};
  return [
    {
      name: "host",
      type: "input",
      alias: "主机",
      default: defaultConfig.host,
      required: true,
    },
  ];
};

const plugin: IPlugin = {
  get name() {
    return "默认图床";
  },
  handle,
  config,
};

export default plugin;
