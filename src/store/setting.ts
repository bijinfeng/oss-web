import { create } from "zustand";

type Theme = "light" | "dark";

interface SettingState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const body = document.querySelector("body");

const useSettingStore = create<SettingState>((set) => {
  const setDodyThemeClass = (theme: Theme) => {
    const classNames = body!.getAttribute("class")?.split(" ") || [];

    body!.setAttribute(
      "class",
      classNames
        ?.filter((it) => !["theme-dark", "theme-light"].includes(it))
        .concat(`theme-${theme}`)
        .join(" ")
    );
  };
  return {
    theme: "light",
    setTheme: (theme = "light") => {
      setDodyThemeClass(theme);
      set({ theme });
    },
  };
});

export default useSettingStore;
