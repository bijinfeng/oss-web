import React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import useSettingStore from "@/store/setting";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useSettingStore();

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`tw-cursor-pointer nav-link hide-theme-${
        theme === "dark" ? "light" : "dark"
      }`}
      onClick={handleChange}
    >
      {theme === "dark" ? (
        <IconSun className="icon" />
      ) : (
        <IconMoon className="icon" />
      )}
    </div>
  );
};

export default ThemeSwitch;
