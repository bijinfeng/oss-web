export function fileSizeFormatter(value = 0): string {
  if (!value) return "0 Bytes";
  const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const index = Math.floor(Math.log(value) / Math.log(1024));
  const size = value / 1024 ** index;
  const sizeString = size.toFixed(2); // 保留的小数位数
  return sizeString + " " + unitArr[index];
}

export const setLocal = (key: string, value: any) => {
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const getLocal = (key: string) => {
  return localStorage.getItem(key);
};

export const isUrl = (url: string): boolean =>
  url.startsWith("http://") || url.startsWith("https://");

export const isUrlEncode = (url: string): boolean => {
  url = url || "";
  try {
    // the whole url encode or decode shold not use encodeURIComponent or decodeURIComponent
    return url !== decodeURI(url);
  } catch (e) {
    // if some error caught, try to let it go
    return true;
  }
};
export const handleUrlEncode = (url: string): string => {
  if (!isUrlEncode(url)) {
    url = encodeURI(url);
  }
  return url;
};
