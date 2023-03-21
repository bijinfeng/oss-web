import React, { useState } from "react";
import cls from "classnames";
import { IconCloudFilled } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { IconX } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

import FileItem from "./FileItem";
import LinkList from "./LinkList";
import { fileSizeFormatter } from "@/utils";
import { uploadFile as uploadFileRequest } from "@/request";
import Modal from "@/components/Modal";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export interface UploadFile {
  uid: string;
  file: File;
  preview: string;
  status: "error" | "waiting" | "success" | "uploading";
  error?: any;
  percent?: number;
  response?: any;
  url?: string;
}

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [fileId, setFileId] = useState<string>();
  const [visible, setVisible] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      setFiles([
        ...acceptedFiles.map((file) => ({
          uid: uuidv4(),
          file,
          status: "waiting" as const,
          preview: URL.createObjectURL(file),
        })),
        ...files,
      ]);
    },
  });

  const handleUploadAll = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleClearAll = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setFiles([]);
  };

  const removeFile = (id: string) => {
    return setFiles((files) => files.filter((_file) => _file.uid !== id));
  };

  const uploadFile = async (id: string) => {
    const file = files.find((it) => it.uid === id);

    const uploadCallback = (data: Partial<UploadFile>) => {
      const target = files.find((it) => it.uid === id);
      if (target) {
        setFiles((files) =>
          files.map((fileData) => {
            if (fileData.uid === id) {
              return {
                ...fileData,
                ...data,
              };
            }
            return fileData;
          })
        );
      }
    };

    if (file) {
      try {
        uploadCallback({ status: "uploading" });
        const response = await uploadFileRequest(
          { file: file.file, isTemp: false },
          (percent) => {
            uploadCallback({ percent });
          }
        );
        uploadCallback({ status: "success", response, url: response.data.url });
      } catch (error) {
        uploadCallback({ error, status: "error" });
      }
    }
  };

  const configUpload = (id: string) => {
    console.log(id);
    setVisible(true);
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="card-title">
                <h3>Image Upload</h3>
                <span className="card-subtitle !tw-ml-0">
                  最大可上传 {fileSizeFormatter(MAX_FILE_SIZE)}{" "}
                  的图片，允许同时上传 3 张。本站已托管 27 张图片。
                </span>
              </div>
            </div>
            <div
              {...getRootProps({
                className: cls("dropzone hover:tw-border-primary tw-relative", {
                  "dz-drag-hover": isDragActive,
                }),
              })}
            >
              <IconX
                onClick={handleClearAll}
                className="tw-absolute tw-right-4 tw-cursor-pointer"
              />
              <input {...getInputProps()} />
              <div className="dz-default dz-message">
                <div className="tw-mb-2">
                  <IconCloudFilled
                    size={65}
                    className="hover:tw-text-primary"
                    onClick={handleUploadAll}
                  />
                </div>
                <button className="dz-button" type="button">
                  拖拽文件到这里，支持多文件同时上传
                  <br />
                  点击上面的图标上传全部已选择文件
                </button>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {files.map((file) => (
                  <FileItem
                    key={file.uid}
                    uploadFile={file}
                    onRemove={removeFile}
                    onUpload={uploadFile}
                    onConfig={configUpload}
                    onClick={() => setFileId(file.uid)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <LinkList fileId={fileId} files={files} />
        <Modal visible={visible} onClose={() => setVisible(false)}>
          xxxxx
        </Modal>
      </div>
    </div>
  );
};

export default UploadPage;
