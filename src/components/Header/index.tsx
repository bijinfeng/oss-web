import React from "react";
import { Link } from "react-router-dom";

import ThemeSwitch from "@/components/ThemeSwitch";
import Logo from "@/components/Logo";

const Header: React.FC = () => {
  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <div className="pe-md-3">
          <Logo />
        </div>
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex me-3">
            <ThemeSwitch />
          </div>
          {/* avatar */}
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
              aria-expanded="false"
            >
              <span
                className="avatar rounded-circle avatar-xs"
                style={{
                  backgroundImage: `url(https://www.gravatar.com/avatar/5f34bb93b4ef7fef80db8a01aba5c6b4)`,
                }}
              />
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <Link to="/main" className="dropdown-item">
                Photos
              </Link>
              <Link to="/upload" className="dropdown-item">
                Upload
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/setting" className="dropdown-item">
                Settings
              </Link>
              <a href="./sign-in.html" className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
