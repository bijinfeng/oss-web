import { IUploader, IUploaderPlugin } from "../../interface";
import ImgFromFile from "./default";

const buildInTransformers: IUploaderPlugin = () => {
  return {
    register(ctx: IUploader) {
      ctx.helper.transformer.register("default", ImgFromFile);
    },
  };
};

export default buildInTransformers;
