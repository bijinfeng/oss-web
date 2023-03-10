import React from "react";

const LinkList: React.FC = () => {
  return (
    <div className="card tw-mt-4">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          deleniti fugit incidunt, iste, itaque minima neque pariatur
          perferendis sed suscipit velit vitae voluptatem.
        </p>
      </div>
    </div>
  );
};

export default LinkList;
