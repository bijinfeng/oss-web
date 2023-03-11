import React from "react";
import { Link } from "react-router-dom";
import {
  IconPhoto,
  IconAlbum,
  IconUserEdit,
  IconCloudUpload,
  IconLogin,
  IconUserUp,
} from "@tabler/icons-react";

import ThemeSwitch from "@/components/ThemeSwitch";
import Logo from "@/components/Logo";
import Avatar from "@/components/Avatar";
import Nav, { NavOption } from "@/components/Nav";
import useUserStore from "@/store/user";

const navOptions: NavOption[] = [
  {
    link: "/main",
    name: "图库",
    icon: <IconPhoto className="icon" />,
  },
  {
    link: "/albums",
    name: "相册",
    icon: <IconAlbum className="icon" />,
  },
  {
    link: "/upload",
    name: "上传",
    icon: <IconCloudUpload className="icon" />,
  },
  {
    link: "/setting",
    name: "设置",
    icon: <IconUserEdit className="icon" />,
  },
];

const Header: React.FC = () => {
  const { userInfo } = useUserStore();

  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <div className="pe-md-3">
          <Logo />
        </div>
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
            <ThemeSwitch />
            {!userInfo && (
              <>
                <Link to="/login" className="nav-link tw-cursor-pointer">
                  <IconLogin className="icon tw-mr-1" />
                  <span className="nav-link-title">登录</span>
                </Link>
                <Link to="/register" className="nav-link tw-cursor-pointer">
                  <IconUserUp className="icon tw-mr-1" />
                  <span className="nav-link-title">注册</span>
                </Link>
              </>
            )}
          </div>
          {userInfo && (
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
                aria-expanded="false"
              >
                <Avatar name={userInfo.email} size="xs" url={userInfo.avatar} />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <Link to="/main" className="dropdown-item">
                  Photos
                </Link>
                <Link to="albums" className="dropdown-item">
                  Albums
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
          )}
        </div>

        {userInfo && <Nav options={navOptions} />}
      </div>
    </header>
  );
};

export default Header;
