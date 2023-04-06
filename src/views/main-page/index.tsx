import React, { useRef, useMemo, useCallback, useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { RouteObject, useSearchParams, defer } from "react-router-dom";
import dayjs from "dayjs";

import Empty from "./Empty";
import FloatButton from "./FloatButton";
import SideLeft, { SidebarProps } from "./SideLeft";
import Detail, { DetailRef } from "./Detail";
import { parseQuery, generateQuery } from "./query";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getFileList } from "@/request";
import { FileInfo } from "@/interface";
import ImageCard from "@/components/ImageCard";
import { widthErrorBoundary } from "@/routers/widthErrorBoundary";

export const loader: RouteObject["loader"] = async ({ request }) => {
  const url = new URL(request.url);
  return defer({ data: getFileList(parseQuery(url.searchParams)) });
};

const MainPage: React.FC<{ data: FileInfo[] }> = ({ data }) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailRef = useRef<DetailRef>(null);

  const searchQuery = useMemo<SidebarProps["value"]>(
    () => parseQuery(searchParams),
    [searchParams]
  );

  const handleClick = (fileInfo: FileInfo) => {
    detailRef.current?.show(fileInfo);
  };

  const handleChange = useCallback<SidebarProps["onChange"]>(
    (value) => setSearchParams(generateQuery(value)),
    [setSearchParams]
  );

  const handleCheck = (id: string, checked: boolean) => {
    setSelectedFiles((preList) => {
      if (checked) {
        return preList.includes(id) ? preList : [...preList, id];
      }
      return preList.includes(id) ? preList.filter((it) => it !== id) : preList;
    });
  };

  const renderList = () => {
    if (data.length === 0) return <Empty />;

    return (
      <div className="row row-cards">
        {data.map((item) => (
          <div key={item._id} className="col-sm-4 col-lg-3">
            <ImageCard
              allowCheck
              checked={selectedFiles.includes(item._id)}
              imgUrl={item.url}
              title={item.name}
              subTitle={dayjs(item.createdAt).format("YYYY-MM-DD")}
              onImageClick={() => handleClick(item)}
              onChange={(checked) => handleCheck(item._id, checked)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Picture List</h2>
              <div className="text-muted mt-1">
                About 2,410 result (0.19 seconds)
              </div>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="d-flex">
                <Input
                  className="me-3"
                  addonAfter={<IconSearch className="icon" />}
                  placeholder="Search…"
                  flat
                />
                <Button
                  href="/upload"
                  type="primary"
                  icon={<IconPlus className="icon" />}
                >
                  Add Photo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row g-4">
            <div className="col-3">
              <SideLeft value={searchQuery} onChange={handleChange} />
            </div>
            <div className="col-9">{renderList()}</div>
          </div>
        </div>
      </div>

      <Detail ref={detailRef} />
      <FloatButton ids={selectedFiles} onClear={() => setSelectedFiles([])} />
    </div>
  );
};

export default widthErrorBoundary(MainPage, "data");
