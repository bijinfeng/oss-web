import React from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useRequest } from "ahooks";

import Empty from "./Empty";
import Image from "./Image";
import SideLeft from "./SideLeft";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getFileList } from "@/request";

const beds = [
  {
    name: "default",
    total: 10,
  },
  {
    name: "qiniuyun",
    total: 20,
  },
];

const MainPage: React.FC = () => {
  const { data = [] } = useRequest(() => getFileList({}));

  console.log(data);

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
              <SideLeft beds={beds} />
            </div>
            <div className="col-9">
              {data.length > 0 ? (
                <div className="row row-cards">
                  {data.map((item) => (
                    <div key={item._id} className="col-sm-4 col-lg-3">
                      <Image data={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
