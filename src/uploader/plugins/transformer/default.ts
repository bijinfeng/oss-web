import { IUploader, IPlugin } from "../../interface";

const handle = async (ctx: IUploader): Promise<IUploader> => {
  ctx.input.forEach((file) => {
    ctx.output.push({ file });
  });
  return ctx;
};

const pligin: IPlugin = { name: "default", handle };

export default pligin;
