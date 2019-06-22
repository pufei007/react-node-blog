import request from "~/utils/request";
import qs from "qs";

//注册
export function register(params) {
  return request(`/api/user/register`, {
    method: "post",
    body: JSON.stringify(params),
  });
}
