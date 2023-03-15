import React from "react";
import dayjs from "dayjs";
import ImageCard from "@/components/ImageCard";
import type { FileInfo } from "@/interface";

interface ImageProps {
  data: FileInfo;
}

const Image: React.FC<ImageProps> = ({ data }) => {
  return (
    <div className="col-sm-4 col-lg-3">
      <ImageCard
        allowCheck
        imgUrl={data.url}
        title={data.name}
        subTitle={dayjs(data.createdAt).format("YYYY-MM-DD")}
      />
    </div>
  );
};

export default Image;
