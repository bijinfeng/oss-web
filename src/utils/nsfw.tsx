import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
} from "react";
import { Deferred } from "./index";
import { useExternalScript } from "@/hooks/useExternalScript";

export interface NSFWContextState {
  modelPromise: React.MutableRefObject<Deferred>;
}

const NsfwContext = createContext({} as NSFWContextState);

export const NsfwProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const nsfwState = useExternalScript("https://unpkg.com/nsfwjs@2.3.0");
  const tfState = useExternalScript("https://unpkg.com/@tensorflow/tfjs@2.6.0");
  const modelPromise = useRef<Deferred>(new Deferred());

  useEffect(() => {
    if (nsfwState === "ready" && tfState === "ready") {
      window.nsfwjs.load("/model/", { size: 299 }).then((model: any) => {
        modelPromise.current.resolve(model);
      });
    }
  }, [nsfwState, tfState]);

  return (
    <NsfwContext.Provider value={{ modelPromise }}>
      {children}
    </NsfwContext.Provider>
  );
};

export type CheckStatus = "success" | "fail" | "checking";

/**
 * 检测分类结果：
 * - 绘画（Drawing）—— 无害的艺术，或艺术绘画；
 * - 变态（Hentai）—— 色情艺术，不适合大多数工作环境；
 * - 中立（Neutral）—— 一般，无害的内容；
 * - 色情（Porn）—— 不雅的内容和行为，通常涉及生殖器；
 * - 性感（Sexy）—— 不合时宜的挑衅内容。
 */
export const useCheckImage = () => {
  const { modelPromise } = useContext(NsfwContext);

  const checkImage = useCallback(
    async (file: File, image: HTMLImageElement): Promise<boolean> => {
      const fileType = file.type;
      const model = await modelPromise.current.promise;

      const getResult = (predictions: any[]) => {
        // 获取比例超过 60% 的分类
        const maxClassify = predictions
          .map((item) => item[0])
          .filter((item) => item.probability >= 0.6)
          .map((item) => item.className);

        // 如果分类中有「Hentai」和「Porn」则校验不通过
        return !maxClassify.find((it) => ["Hentai", "Porn"].includes(it));
      };

      if (fileType === "image/gif") {
        const predictions = await model.classifyGif(image, {
          topk: 1,
          onFrame: ({ index, totalFrames, predictions }: any) => {
            const percent = ((index / totalFrames) * 100).toFixed(0);
            console.log(
              `${percent}% - Frame ${index} is ${predictions[0].className}`
            );
          },
        });
        return getResult(predictions);
      } else {
        const prediction = await model.classify(image);
        return getResult([prediction]);
      }
    },
    []
  );

  return checkImage;
};
