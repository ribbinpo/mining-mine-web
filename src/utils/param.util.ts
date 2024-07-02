import { camelToSnakeCase } from "./string.util";

export const encodeQuery = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => `${camelToSnakeCase(key)}=${params[key]}`)
    .join("&");
};
