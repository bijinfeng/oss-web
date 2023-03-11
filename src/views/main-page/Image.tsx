import React from "react";
import dayjs from "dayjs";
import type { FileInfo } from "@/interface";

interface ImageProps {
  data: FileInfo;
}

const Image: React.FC<ImageProps> = ({ data }) => {
  return (
    <div className="card card-sm">
      <a href="#" className="d-block">
        <img src={data.url} className="card-img-top" />
      </a>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div>
            <div>{data.name}</div>
            <div className="text-muted">
              {dayjs(data.createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
