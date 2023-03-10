import React from "react";
import { IconCloudUpload, IconX, IconServerCog } from "@tabler/icons-react";

import Button from "@/components/Button";
import { fileSizeFormatter } from "@/utils";

interface FileItemProps {
  file: File;
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  return (
    <div
      style={{ backgroundColor: "var(--tblr-body-bg)" }}
      className="tw-gap-3 tw-flex tw-items-center tw-p-2 tw-mb-2 last:tw-mb-0 tw-rounded-md tw-relative tw-bg-gray-50 tw-overflow-hidden"
    >
      <span
        className="avatar"
        style={{
          backgroundImage: `url(${URL.createObjectURL(file)})`,
        }}
      />
      <div className="tw-flex-1 text-truncate">
        <div className="text-reset d-block">{file.name}</div>
        <div className="d-block text-muted text-truncate mt-n1">
          {fileSizeFormatter(file.size)}
        </div>
      </div>
      <Button shape="round" className="btn-icon">
        <IconServerCog size={16} />
      </Button>
      <Button shape="round" className="btn-icon">
        <IconCloudUpload size={16} />
      </Button>
      <Button shape="round" className="btn-icon">
        <IconX size={16} />
      </Button>
    </div>
  );
};

export default FileItem;
