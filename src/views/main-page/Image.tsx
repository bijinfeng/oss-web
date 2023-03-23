import React from "react";
import dayjs from "dayjs";
import ImageCard from "@/components/ImageCard";
import type { FileInfo } from "@/interface";

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FileInfo;
}

const Image: React.FC<ImageProps> = ({ data, ...rest }) => {
  return (
    <div className="col-sm-4 col-lg-3" {...rest}>
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
