import React from "react";

import AccountSetting from "./AccountSetting";

const SettingPage: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Account Settings</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="row g-0">
              <div className="col-3 d-none d-md-block border-end">
                <div className="card-body">
                  <div className="list-group list-group-transparent">
                    <a
                      href="./settings.html"
                      className="list-group-item list-group-item-action d-flex align-items-center active"
                    >
                      My Account
                    </a>
                  </div>
                </div>
              </div>
              <div className="col d-flex flex-column">
                <AccountSetting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
