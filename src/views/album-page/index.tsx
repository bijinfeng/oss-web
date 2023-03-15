import React from "react";
import { useAlbumStore } from "@/store/album";
import ImageCard from "@/components/ImageCard";

const MainPage: React.FC = () => {
  const list = useAlbumStore((state) => state.list);

  return (
    <div className="page-wrapper">
      <div className="page-header page-header d-print-none">
        <div className="container-xl"></div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          {list.map((item) => (
            <ImageCard
              key={item._id}
              title={item.name}
              imgUrl={item.banner}
              subTitle={`包含 ${item.total} 张图片`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
