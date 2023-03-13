import React, { useState } from "react";
import cls from "classnames";

import AccountSetting from "./AccountSetting";
import BedSetting from "./BedSetting";

const setNavs = [
  {
    name: "My Account",
    content: <AccountSetting />,
  },
  {
    name: "Beds",
    content: <BedSetting />,
  },
];

const SettingPage: React.FC = () => {
  const [currentNav, setCurrentNav] = useState(() => setNavs[0].name);

  const renderContent = () => {
    const targetNav = setNavs.find((it) => it.name === currentNav);
    return targetNav?.content ?? null;
  };

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
                    {setNavs.map((nav, index) => (
                      <div
                        key={index}
                        className={cls(
                          "list-group-item list-group-item-action d-flex align-items-center tw-cursor-pointer",
                          "tw-cursor-pointer",
                          { active: nav.name === currentNav }
                        )}
                        onClick={() => setCurrentNav(nav.name)}
                      >
                        {nav.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col d-flex flex-column">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
