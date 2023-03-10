import React from "react";

const Image: React.FC = () => {
  return (
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
  );
};

export default Image;
