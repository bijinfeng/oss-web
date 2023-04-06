import type { IDefaultConfig, IPlugin } from "../../interface";
import { getLocal } from "@/utils";

interface DefaultResData {
  url: string;
}

const handle: IPlugin["handle"] = async (ctx, callback) => {
  const defaultConfig = ctx.getConfig<IDefaultConfig>("bed.default") ?? {};
  try {
    return Promise.all(
      ctx.output.map(async (img, index) => {
        const formData = new FormData();
        formData.append("file", img.file);
        formData.append("isTemp", "false");

        const res = await ctx.request<DefaultResData>({
          baseURL: defaultConfig.host,
          url: "/upload_file",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getLocal("token"),
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percentage = Math.round((100 * event.loaded) / event.total);
              callback?.(index, percentage);
            }
          },
        });
        if (res.data.url) {
          img.imgUrl = res.data.url;
        }
        return res;
      })
    );
  } catch (error) {
    ctx.log.error("default plugin upload error: ", error);
  }
};

const config: IPlugin["config"] = (ctx) => {
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
