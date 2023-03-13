import { EventEmitter } from "events";
import { createContext } from "./createContext";
import { IBuildInEvent } from "./enum";
import type {
  IUploader,
  ILifecyclePlugins,
  IPlugin,
  Undefinable,
} from "./interface";
import { handleUrlEncode } from "@/utils";

export class Lifecycle extends EventEmitter {
  private readonly ctx: IUploader;

  constructor(ctx: IUploader) {
    super();
    this.ctx = ctx;
  }

  async start(input: File[]): Promise<IUploader> {
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
      await this.doTransform(ctx);
      await this.beforeUpload(ctx);
      await this.doUpload(ctx);
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

  private async doTransform(ctx: IUploader): Promise<IUploader> {
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 30);
    const type =
      ctx.getConfig<Undefinable<string>>("picBed.transformer") || "path";
    let currentTransformer = type;
    let transformer = ctx.helper.transformer.get(type);
    if (!transformer) {
      transformer = ctx.helper.transformer.get("path");
      currentTransformer = "path";
      ctx.log.warn(
        `Can't find transformer - ${type}, switch to default transformer - path`
      );
    }
    ctx.log.info(
      `Transforming... Current transformer is [${currentTransformer}]`
    );
    await transformer?.handle(ctx);
    return ctx;
  }

  private async beforeUpload(ctx: IUploader): Promise<IUploader> {
    ctx.emit(IBuildInEvent.UPLOAD_PROGRESS, 60);
    ctx.log.info("Before upload");
    ctx.emit(IBuildInEvent.BEFORE_UPLOAD, ctx);
    await this.handlePlugins(ctx.helper.beforeUploadPlugins, ctx);
    return ctx;
  }

  private async doUpload(ctx: IUploader): Promise<IUploader> {
    let type =
      ctx.getConfig<Undefinable<string>>("picBed.uploader") ||
      ctx.getConfig<Undefinable<string>>("picBed.current") ||
      "smms";
    let uploader = ctx.helper.uploader.get(type);
    let currentTransformer = type;
    if (!uploader) {
      type = "smms";
      currentTransformer = "smms";
      uploader = ctx.helper.uploader.get("smms");
      ctx.log.warn(
        `Can't find uploader - ${type}, switch to default uploader - smms`
      );
    }
    ctx.log.info(`Uploading... Current uploader is [${currentTransformer}]`);
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
