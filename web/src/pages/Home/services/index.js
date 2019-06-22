import request from "../../../utils/request";
import qs from "qs";

export async function getBlogList(params) {
  return request(`/api/blog/list?${qs.stringify(params)}`, {
    method: "get"
  });
}