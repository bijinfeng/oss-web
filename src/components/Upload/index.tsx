import React, { useState, forwardRef } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import cls from "classnames";
import { useUpdateEffect } from "ahooks";
import { isEmpty } from "lodash-es";
import { uploadFile } from "@/request";

interface UploadProps extends DropzoneOptions {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

const Upload = forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
  const { title, subTitle, icon, value, error, onChange, ...rest } = props;
  const [preview, setPreview] = useState<string | undefined>(value);

  useUpdateEffect(() => {
    isEmpty(value) && setPreview(value);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        const fileData = await uploadFile({ file, isTemp: true });
        if (fileData?.data?.url) {
          onChange?.(fileData.data.url);
        }
      }
    },
    ...rest,
  });

  return (
    <div
      {...getRootProps({
        ref,
        className: cls(
          "dropzone hover:tw-border-primary tw-relative !tw-p-0 tw-cursor-pointer",
          "tw-bg-no-repeat tw-bg-cover",
          {
            "dz-drag-hover": isDragActive,
            "text-white": preview,
            "is-invalid !tw-border-danger": error,
          }
        ),
        style: { backgroundImage: preview ? `url(${preview})` : undefined },
      })}
    >
      <input {...getInputProps()} />
      <div className="dz-default dz-message">
        {icon}
        {title && <h4>{title}</h4>}
        {subTitle && <div>{subTitle}</div>}
      </div>
    </div>
  );
});

export default Upload;
