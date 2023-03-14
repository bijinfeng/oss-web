import { EventEmitter } from "events";
import { createContext } from "./createContext";
import { IBuildInEvent } from "./enum";
import type { IUploader, ILifecyclePlugins, IPlugin } from "./interface";
import { handleUrlEncode } from "@/utils";

export class Lifecycle extends EventEmitter {
  private readonly ctx: IUploader;

  constructor(ctx: IUploader) {
    super();
    this.ctx = ctx;
  }

  async start(input: File[], bed: string): Promise<IUploader> {
    // ensure every upload process has an unique context
    const ctx = createContext(this.ctx);

    try {
      // images input
      if (!Array.isArray(input)) {
        throw new Error("Input must be an array.");
      }
      ctx.input = input;
      ctx.output = [];

      // lifecycle main
      await this.beforeTransform(ctx);
      await this.doTransform(ctx, bed);
      await this.beforeUpload(ctx);
      await this.doUpload(ctx, bed);
      await this.afterUpload(ctx);
      return ctx;
    } catch (error) {
      ctx.log.warn(IBuildInEvent.FAILED);
      ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, -1);
      ctx.emit(IBuildInEvent.FAILED, error);
      ctx.log.error(error);
      return ctx;
    }
  }

  private async beforeTransform(ctx: IUploader): Promise<IUploader> {
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 0);
    ctx.emit(IBuildInEvent.BEFORE_TRANSFORM, ctx);
    ctx.log.info("Before transform");
    await this.handlePlugins(ctx.helper.beforeTransformPlugins, ctx);
    return ctx;
  }

  private async doTransform(ctx: IUploader, type: string): Promise<IUploader> {
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 30);
    // use default transformr
    const defaultTransformer = ctx.helper.transformer.get("default");
    await defaultTransformer?.handle(ctx);

    if (type !== "default") {
      const bedTransformer = ctx.helper.transformer.get(type);
      if (!bedTransformer) {
        ctx.log.warn(
          `Can't find transformer - ${type}, only use default transformer`
        );
        return ctx;
      }
      await bedTransformer.handle(ctx);
    }

    return ctx;
  }

  private async beforeUpload(ctx: IUploader): Promise<IUploader> {
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 60);
    ctx.log.info("Before upload");
    ctx.emit(IBuildInEvent.BEFORE_UPLOAD, ctx);
    await this.handlePlugins(ctx.helper.beforeUploadPlugins, ctx);
    return ctx;
  }

  private async doUpload(ctx: IUploader, type: string): Promise<IUploader> {
    let uploader = ctx.helper.uploader.get(type);
    if (!uploader) {
      type = "default";
      uploader = ctx.helper.uploader.get("default");
      ctx.log.warn(`Can't find uploader - ${type}, switch to default uploader`);
    }
    ctx.log.info(`Uploading... Current uploader is [${type}]`);
    await uploader?.handle(ctx);
    for (const outputImg of ctx.output) {
      outputImg.type = type;
    }
    return ctx;
  }

  private async afterUpload(ctx: IUploader): Promise<IUploader> {
    ctx.emit(IBuildInEvent.AFTER_UPLOAD, ctx);
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 100);
    await this.handlePlugins(ctx.helper.afterUploadPlugins, ctx);
    let msg = "";
    const length = ctx.output.length;
    for (let i = 0; i < length; i++) {
      if (typeof ctx.output[i].imgUrl !== "undefined") {
        msg += handleUrlEncode(ctx.output[i].imgUrl!);
        if (i !== length - 1) {
          msg += "\n";
        }
      }
      delete ctx.output[i].base64Image;
      delete ctx.output[i].buffer;
    }
    ctx.emit(IBuildInEvent.FINISHED, ctx);
    ctx.log.info(`\n${msg}`);
    return ctx;
  }

  private async handlePlugins(
    lifeCyclePlugins: ILifecyclePlugins,
    ctx: IUploader
  ): Promise<IUploader> {
    const plugins = lifeCyclePlugins.getList();
    const pluginNames = lifeCyclePlugins.getIdList();
    const lifeCycleName = lifeCyclePlugins.getName();
    await Promise.all(
      plugins.map(async (plugin: IPlugin, index: number) => {
        try {
          ctx.log.info(`${lifeCycleName}: ${pluginNames[index]} running`);
          await plugin.handle(ctx);
        } catch (e) {
          ctx.log.error(`${lifeCycleName}: ${pluginNames[index]} error`);
          throw e;
        }
      })
    );
    return ctx;
  }
}
