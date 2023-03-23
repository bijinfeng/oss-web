import { forwardRef } from "react";

import { usePreview, PreviewParams } from "./usePreview";
import Avatar from "@/components/Avatar";

interface AvatarUploadProps extends PreviewParams {
  name?: string;
}

const AvatarUpload = forwardRef<HTMLDivElement, AvatarUploadProps>(
  (props, ref) => {
    const { name, ...rest } = props;
    const { preview, dropzoneState } = usePreview(rest);
    const { getRootProps, getInputProps } = dropzoneState;

    console.log(preview);

    return (
      <div {...getRootProps({ ref, className: "tw-inline-flex" })}>
        <input {...getInputProps()} />
        <Avatar url={preview} name={name} size="xl" />
      </div>
    );
  }
);

export default AvatarUpload;
