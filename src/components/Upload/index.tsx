import React, { forwardRef } from "react";
import cls from "classnames";
import { usePreview, PreviewParams } from "./usePreview";

interface UploadProps extends PreviewParams {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  error?: boolean;
}

const Upload = forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
  const { title, subTitle, icon, error, ...rest } = props;
  const { preview, dropzoneState } = usePreview(rest);
  const { getRootProps, getInputProps, isDragActive } = dropzoneState;

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
