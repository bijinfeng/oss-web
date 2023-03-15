import React, { useRef } from "react";
import { useMount } from "ahooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import AlbumModal, { AlbumModalRef } from "./AlbumModal";
import { useAlbumStore } from "@/store/album";
import ImageCard from "@/components/ImageCard";
import Input from "@/components/Input";
import Button from "@/components/Button";

const MainPage: React.FC = () => {
  const list = useAlbumStore((state) => state.list);
  const fetchAlbum = useAlbumStore((state) => state.fetchAlbum);
  const albumModalRef = useRef<AlbumModalRef>(null);

  useMount(() => {
    fetchAlbum();
  });

  const handleAdd = () => albumModalRef.current?.show();

  return (
    <div className="page-wrapper">
      <div className="page-header page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col"></div>
            <div className="col-auto ms-auto d-print-none">
              <div className="d-flex">
                <Input
                  className="me-3"
                  addonAfter={<IconSearch className="icon" />}
                  placeholder="Search…"
                  flat
                />
                <Button
                  type="primary"
                  icon={<IconPlus className="icon" />}
                  onClick={handleAdd}
                >
                  Add Album
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            {list.map((item) => (
              <div key={item._id} className="col-sm-4 col-lg-3">
                <ImageCard
                  title={item.name}
                  imgUrl={item.banner}
                  subTitle={`包含 ${item.total} 张图片`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AlbumModal ref={albumModalRef} />
    </div>
  );
};

export default MainPage;
