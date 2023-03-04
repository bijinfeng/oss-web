const styles: ThemeColor[] = [
  {
    appColor: "linear-gradient(#8B5C68, #37394E)",
    asideColor: "linear-gradient(#8B5C68, #484B58)",
  },
  {
    appColor: "linear-gradient(#875D56, #3A3B4E)",
    asideColor: "linear-gradient(#875D56, #484B58)",
  },
  {
    appColor: "linear-gradient(#546F67, #333B4E)",
    asideColor: "linear-gradient(#546F67, #484B58)",
  },
  {
    appColor: "linear-gradient(#7D5A86, #39394E)",
    asideColor: "linear-gradient(#7D5A86, #484B58)",
  },
  {
    appColor: "linear-gradient(#80865A, #39394E)",
    asideColor: "linear-gradient(#80865A, #484B58)",
  },
  {
    appColor: "linear-gradient(#8B5C68, #37394E)",
    asideColor: "linear-gradient(#8B5C68, #484B58)",
  },
];

export interface ThemeColor {
  appColor: string;
  asideColor: string;
}

export const getThemeColor: () => ThemeColor = () =>
  styles[Math.floor(Math.random() * styles.length)];
