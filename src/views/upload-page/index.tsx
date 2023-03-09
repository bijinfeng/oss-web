import React from "react";

import "@tabler/core/dist/libs/dropzone/dist/dropzone-min";
import "@tabler/core/dist/libs/dropzone/dist/dropzone.css";

const UploadPage: React.FC = () => {
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Image Upload</h3>
            <form
              className="dropzone dz-clickable"
              id="dropzone-multiple"
              action="./"
              autoComplete="off"
              noValidate={undefined}
            >
              <div className="dz-default dz-message">
                <button className="dz-button" type="button">
                  Drop files here to upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
