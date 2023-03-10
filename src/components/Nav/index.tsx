import React from "react";
import cls from "classnames";
import { NavLink } from "react-router-dom";

export interface NavOption {
  icon: React.ReactNode;
  name: string;
  link: string;
}

interface NavProps {
  options: NavOption[];
}

const Nav: React.FC<NavProps> = ({ options }) => {
  return (
    <div className="collapse navbar-collapse">
      <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
        <div className="navbar-nav">
          {options.map((option) => (
            <NavLink
              className={({ isActive }) =>
                cls("nav-item tw-text-inherit !tw-no-underline", {
                  active: isActive,
                })
              }
              to={option.link}
              key={option.link}
            >
              <div className="nav-link">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {option.icon}
                </span>
                <span className="nav-link-title">{option.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
