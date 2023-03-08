import React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import useSettingStore from "@/store/setting";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useSettingStore();

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <a
      className={`nav-link px-0 hide-theme-${
        theme === "dark" ? "light" : "dark"
      }`}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      aria-label="Enable dark mode"
      data-bs-original-title="Enable dark mode"
      onClick={handleChange}
    >
      {theme === "dark" ? (
        <IconSun className="icon" />
      ) : (
        <IconMoon className="icon" />
      )}
    </a>
  );
};

export default ThemeSwitch;
