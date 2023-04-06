import React, { useState, useRef } from "react";
import cls from "classnames";
import { IconCloudFilled } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { IconX } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

import FileItem from "./FileItem";
import LinkList from "./LinkList";
import ConfigModal, { ConfigModalRef } from "./ConfigModal";
import { fileSizeFormatter } from "@/utils";
import uploader from "@/uploader";
import { setPhoto } from "@/request";

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
  bed: string;
  album: string;
}

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [fileId, setFileId] = useState<string>();
  const configModalRef = useRef<ConfigModalRef>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: async (acceptedFiles) => {
      const previews = await Promise.all(
        acceptedFiles.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve(e.target!.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );

      setFiles([
        ...acceptedFiles.map((file, index) => ({
          uid: uuidv4(),
          file,
          status: "waiting" as const,
          preview: previews[index],
          bed: "default",
          album: "xxxx",
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
    const fileData = files.find((it) => it.uid === id);

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

    if (fileData) {
      try {
        uploadCallback({ status: "uploading" });
        const response = await uploader.upload(
          [fileData.file],
          fileData.bed,
          (_, percent) => {
            uploadCallback({ percent });
          }
        );
        if (response[0].imgUrl) {
          uploadCallback({
            status: "success",
            response,
            url: response[0].imgUrl,
          });
          setPhoto({
            name: fileData.file.name,
            type: fileData.file.type,
            size: fileData.file.size,
            url: response[0].imgUrl,
            bed: fileData.bed,
            album: fileData.album,
          });
        }
      } catch (error) {
        uploadCallback({ error, status: "error" });
      }
    }
  };

  const configUpload = (id: string) => {
    const file = files.find((it) => it.uid === id);
    file && configModalRef.current?.show(file);
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="card-title">
                <h3>Image Upload</h3>
                <ul className="card-subtitle !tw-ml-0">
                  <li className="text-red">严禁上传各类非法图片</li>
                  <li>
                    最大可上传 {fileSizeFormatter(MAX_FILE_SIZE)}{" "}
                    的图片，允许同时上传 3 张。本站已托管 27 张图片。
                  </li>
                </ul>
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
        <ConfigModal ref={configModalRef} />
      </div>
    </div>
  );
};

export default UploadPage;
