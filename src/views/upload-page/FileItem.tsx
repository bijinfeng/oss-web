import React from "react";
import cls from "classnames";
import { IconCloudUpload, IconX, IconServerCog } from "@tabler/icons-react";

import type { UploadFile } from "./index";
import Button from "@/components/Button";
import { fileSizeFormatter } from "@/utils";

interface FileItemProps {
  uploadFile: UploadFile;
  onRemove: (id: string) => void;
  onUpload: (id: string) => void;
  onConfig: (id: string) => void;
  onClick: () => void;
}

const FileItem: React.FC<FileItemProps> = ({
  uploadFile,
  onRemove,
  onUpload,
  onConfig,
  onClick,
}) => {
  const { file, preview, status, percent } = uploadFile;

  const getWidthPercent = () => {
    if (status === "success" || status === "error") return 100;
    if (status === "waiting") return 0;
    return percent || 0;
  };

  return (
    <div
      style={{ backgroundColor: "var(--tblr-body-bg)" }}
      className="tw-cursor-pointer tw-p-2 tw-mb-2 last:tw-mb-0 tw-rounded-md tw-relative tw-bg-gray-50 tw-overflow-hidden"
      onClick={onClick}
    >
      <div
        className={cls(
          "tw-absolute tw-w-full tw-h-full tw-left-0 tw-top-0 bg-lime-lt",
          {
            "bg-lime-lt": ["success", "uploading"].includes(status),
            "bg-pink-lt": status === "error",
          }
        )}
        style={{ width: `${getWidthPercent()}%` }}
      />
      <div className="tw-relative tw-flex tw-items-center tw-gap-3">
        <span className="avatar tw-overflow-hidden">
          <img
            className="tw-w-full tw-h-full tw-object-cover"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
        </span>
        <div className="tw-flex-1 text-truncate">
          <div className="text-reset d-block">{file.name}</div>
          <div className="d-block text-muted text-truncate mt-n1">
            {fileSizeFormatter(file.size)}, {status === "waiting" && "等待上传"}
            {status === "uploading" && `上传中...${percent}%`}
            {status === "success" && (
              <span className="text-lime">上传成功</span>
            )}
            {status === "error" && <span className="text-pink">上传失败</span>}
          </div>
        </div>
        {status === "waiting" && (
          <Button
            shape="round"
            className="btn-icon"
            onClick={() => onConfig(uploadFile.uid)}
          >
            <IconServerCog size={16} />
          </Button>
        )}
        {status === "waiting" && (
          <Button
            shape="round"
            className="btn-icon"
            onClick={() => onUpload(uploadFile.uid)}
          >
            <IconCloudUpload size={16} />
          </Button>
        )}
        <Button
          shape="round"
          className="btn-icon"
          onClick={() => onRemove(uploadFile.uid)}
        >
          <IconX size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FileItem;
