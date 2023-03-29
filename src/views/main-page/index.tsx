import React, { useRef, useMemo, useCallback } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useLoaderData, RouteObject, useSearchParams } from "react-router-dom";

import Empty from "./Empty";
import Image from "./Image";
import SideLeft, { SidebarProps } from "./SideLeft";
import Detail, { DetailRef } from "./Detail";
import { parseQuery, generateQuery } from "./query";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getFileList } from "@/request";
import { FileInfo } from "@/interface";

export const loader: RouteObject["loader"] = async ({ request }) => {
  const url = new URL(request.url);
  return getFileList(parseQuery(url.searchParams));
};

const MainPage: React.FC = () => {
  const data = useLoaderData() as FileInfo[];
  const [searchParams, setSearchParams] = useSearchParams();
  const detailRef = useRef<DetailRef>(null);

  const searchQuery = useMemo<SidebarProps["value"]>(
    () => parseQuery(searchParams),
    [searchParams]
  );

  const handleClick = () => {
    detailRef.current?.show();
  };

  const handleChange = useCallback<SidebarProps["onChange"]>(
    (value) => setSearchParams(generateQuery(value)),
    [setSearchParams]
  );

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
            <div className="col-9">
              {data.length > 0 ? (
                <div className="row row-cards">
                  {data.map((item) => (
                    <Image key={item._id} data={item} onClick={handleClick} />
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>

      <Detail ref={detailRef} />
    </div>
  );
};

export default MainPage;
