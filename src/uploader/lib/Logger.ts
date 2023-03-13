import { Debugout } from "debugout.js";

import type { IUploader } from "../interface";

export class Logger extends Debugout {
  constructor(_ctx: IUploader) {
    super({
      realTimeLoggingOn: true,
      useTimestamps: true,
      autoTrim: true,
      maxLines: 300,
      useLocalStorage: true,
      localStorageKey: "debug_logs",
    });
  }
}
