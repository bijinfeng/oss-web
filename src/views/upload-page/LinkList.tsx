import React, { useState, useEffect } from "react";
import cls from "classnames";
import type { UploadFile } from "./index";

type LinkFormat = (fileData: Required<UploadFile>) => string;

const linkFormats: { format: LinkFormat; name: string }[] = [
  {
    name: "URL",
    format: (fileData) => fileData.url,
  },
  {
    name: "Markdown",
    format: (fileData) => `![${fileData.file.name}](${fileData.url})`,
  },
  {
    name: "HTML",
    format: (fileData) =>
      `<img src="${fileData.url}" alt="${fileData.file.name}" title="${fileData.file.name}" />`,
  },
];

interface LinkListProps {
  fileId?: string;
  files: UploadFile[];
}

const LinkList: React.FC<LinkListProps> = ({ fileId, files }) => {
  const [nav, setNav] = useState<string>(linkFormats[0].name);
  const [fileData, setFileData] = useState<Required<UploadFile>>();

  useEffect(() => {
    const target = files.find(
      (it) => it.uid === fileId && it.status === "success" && it.url
    );
    target && setFileData(target as Required<UploadFile>);
  }, [fileId, files]);

  if (!fileData) return null;

  const renderLink = () => {
    const linkFormat = linkFormats.find((it) => it.name === nav);
    return linkFormat ? linkFormat.format(fileData) : null;
  };

  return (
    <div className="card tw-mt-4">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          {linkFormats.map((item) => (
            <li className="nav-item tw-cursor-pointer" key={item.name}>
              <div
                className={cls("nav-link", { active: nav === item.name })}
                onClick={() => setNav(item.name)}
              >
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <p className="text-muted">{renderLink()}</p>
      </div>
    </div>
  );
};

export default LinkList;
