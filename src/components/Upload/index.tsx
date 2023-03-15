import React from "react";
import { useDropzone } from "react-dropzone";
import cls from "classnames";

interface UploadProps {
  maxSize?: number;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
}

const Upload: React.FC<UploadProps> = (props) => {
  const { maxSize, title, subTitle, icon } = props;
  // const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize,
    // onDrop: (acceptedFiles) => {
    //   setFiles([
    //     ...acceptedFiles.map((file) => ({
    //       uid: uuidv4(),
    //       file,
    //       status: "waiting" as const,
    //       preview: URL.createObjectURL(file),
    //     })),
    //     ...files,
    //   ]);
    // },
  });

  return (
    <div
      {...getRootProps({
        className: cls(
          "dropzone hover:tw-border-primary tw-relative !tw-p-0 tw-cursor-pointer",
          {
            "dz-drag-hover": isDragActive,
          }
        ),
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
};

export default Upload;
