import { useState, useRef } from "react";
import { useUpdateEffect } from "ahooks";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { uploadFile } from "@/request";

export interface PreviewParams extends DropzoneOptions {
  value?: string;
  onChange?: (value: string) => void;
}

export const usePreview = (params: PreviewParams) => {
  const { value, onChange, ...rest } = params;
  const originUrl = useRef(value);
  const [preview, setPreview] = useState<string | undefined>(value);

  useUpdateEffect(() => {
    if (value !== originUrl.current) {
      setPreview(value);
    }
  }, [value]);

  const dropzoneState = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        const fileData = await uploadFile({ file, isTemp: true });
        const url = fileData?.data?.url;
        if (url) {
          originUrl.current = url;
          onChange?.(url);
        }
      }
    },
    ...rest,
  });

  return { preview, dropzoneState };
};
