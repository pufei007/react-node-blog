import request from "../../../utils/request";
import qs from "qs";

export async function newBlog(params) {
  return request(`/api/blog/new`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json;', // 指定提交方式为表单提交
    }),
  });
}
export async function updateBlog(params) {
  return request(`/api/blog/update`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json;', // 指定提交方式为表单提交
    }),
  });
}