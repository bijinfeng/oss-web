import React from "react";
import { IconCloudFilled } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

import FileItem from "./FileItem";
import LinkList from "./LinkList";
import Select from "@/components/Select";

const UploadPage: React.FC = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="card-title">
                <h3>Image Upload</h3>
                <span className="card-subtitle !tw-ml-0">
                  最大可上传 5.00 MB 的图片，允许同时上传 3 张。本站已托管 27
                  张图片。
                </span>
              </div>
              <div className="tw-w-44">
                <Select />
              </div>
            </div>
            <div {...getRootProps({ className: "dropzone dz-clickable" })}>
              <input {...getInputProps()} />
              <div className="dz-default dz-message">
                <div className="tw-mb-2">
                  <IconCloudFilled
                    size={65}
                    className="hover:tw-text-blue-300"
                  />
                </div>
                <button className="dz-button" type="button">
                  拖拽文件到这里，支持多文件同时上传
                  <br />
                  点击上面的图标上传全部已选择文件
                </button>
              </div>
              <div>
                {acceptedFiles.map((file, index) => (
                  <FileItem key={index} file={file} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <LinkList />
      </div>
    </div>
  );
};

export default UploadPage;
