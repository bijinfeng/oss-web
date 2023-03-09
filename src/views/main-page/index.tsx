import React from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import Input from "@/components/Input";
import Button from "@/components/Button";

interface Bed {
  name: string;
  total: number;
}

const beds: Bed[] = [
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
              <div className="subheader mb-2">Category</div>
              <div className="list-group list-group-transparent mb-3">
                {beds.map((bed) => (
                  <a
                    key={bed.name}
                    className="list-group-item list-group-item-action d-flex align-items-center active"
                    href="#"
                  >
                    {bed.name}
                    <small className="text-muted ms-auto">{bed.total}</small>
                  </a>
                ))}
              </div>
            </div>
            <div className="col-9">
              <div className="row row-cards">
                <div className="col-sm-4 col-lg-3">
                  <div className="card card-sm">
                    <a href="#" className="d-block">
                      <img
                        src="https://preview.tabler.io/static/photos/beautiful-blonde-woman-relaxing-with-a-can-of-coke-on-a-tree-stump-by-the-beach.jpg"
                        className="card-img-top"
                      />
                    </a>
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div>
                          <div>Paweł Kuna</div>
                          <div className="text-muted">3 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
