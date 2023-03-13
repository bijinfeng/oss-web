import type { IUploaderPlugin, IUploader } from "../../interface";

import DefaultUploader from "./default";

const buildInUploaders: IUploaderPlugin = () => {
  return {
    register(ctx: IUploader) {
      ctx.helper.uploader.register("default", DefaultUploader);
    },
  };
};

export default buildInUploaders;
