import axios from "axios";
// import { URL } from "url";

import type {
  IRequest,
  IUploader,
  IRequestConfig,
  IResponse,
} from "../interface";

export class Request implements IRequest {
  private readonly ctx: IUploader;
  private instance!: ReturnType<typeof axios.create>;

  constructor(ctx: IUploader) {
    this.ctx = ctx;
    this.init();
  }

  private init() {
    const instance = axios.create({
      onUploadProgress: (event) => {
        const percentage = Math.round((100 * event.loaded) / event.total!);
        console.log(percentage);
      },
    });

    instance.interceptors.request.use((obj) => {
      return obj;
    });

    this.instance = instance;
  }

  request<T, U extends IRequestConfig>(options: U): Promise<IResponse<T, U>> {
    return this.instance.request(options);
  }
}
