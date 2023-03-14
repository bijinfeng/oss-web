import { IUploader } from "./interface";

/**
 * create an unique context for each upload process
 * @param ctx
 */
export const createContext = (ctx: IUploader): IUploader => {
  return {
    log: ctx.log,
    output: [],
    input: [],
    Request: ctx.Request,
    helper: ctx.helper,
    request: ctx.request,
    getConfig: ctx.getConfig.bind(ctx),
    setConfig: ctx.setConfig.bind(ctx),
    upload: ctx.upload.bind(ctx),
    getPluginConfigList: ctx.getPluginConfigList.bind(ctx),
    addListener: ctx.addListener.bind(ctx),
    on: ctx.on.bind(ctx),
    once: ctx.once.bind(ctx),
    removeListener: ctx.removeListener.bind(ctx),
    off: ctx.off.bind(ctx),
    removeAllListeners: ctx.removeAllListeners.bind(ctx),
    setMaxListeners: ctx.setMaxListeners.bind(ctx),
    getMaxListeners: ctx.getMaxListeners.bind(ctx),
    listeners: ctx.listeners.bind(ctx),
    rawListeners: ctx.rawListeners.bind(ctx),
    emit: ctx.emit.bind(ctx),
    listenerCount: ctx.listenerCount.bind(ctx),
    prependListener: ctx.prependListener.bind(ctx),
    prependOnceListener: ctx.prependOnceListener.bind(ctx),
    eventNames: ctx.eventNames.bind(ctx),
  };
};
