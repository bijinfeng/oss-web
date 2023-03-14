import type { IUploaderPlugin, IUploader } from "../../interface";

import DefaultUploader from "./default";
import QiniuUploader from "./qiniu";

const buildInUploaders: IUploaderPlugin = () => {
  return {
    register(ctx: IUploader) {
      ctx.helper.uploader.register("default", DefaultUploader);
      ctx.helper.uploader.register("qiniu", QiniuUploader);
    },
  };
};

export default buildInUploaders;
