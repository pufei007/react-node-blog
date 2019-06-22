import request from "../../../utils/request";
import qs from "qs";

export async function getBlogList(params) {
  return request(`/api/blog/detail?${qs.stringify(params)}`, {
    method: "get"
  });
}