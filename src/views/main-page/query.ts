import { reduce, isArray, isEmpty } from "lodash-es";

import type { SidebarProps } from "./SideLeft";

/**
 * 从 URL 中解析出查询参数
 * @param params
 * @returns
 */
export const parseQuery = (params: URLSearchParams): SidebarProps["value"] => {
  const bed = params.get("bed");
  const album = params.get("album");

  return {
    bed: bed ? bed.split(",") : [],
    album: album ? album.split(",") : [],
  };
};

type QueryObject = Record<string, string>;

export const generateQuery = (value: SidebarProps["value"]): QueryObject => {
  return reduce(
    value,
    (result: QueryObject, it, key) => {
      if (!isEmpty(it) && isArray(it)) {
        result[key] = it.join(",");
      }
      return result;
    },
    {}
  );
};
