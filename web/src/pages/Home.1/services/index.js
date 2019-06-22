import request from "../../../utils/request";
import qs from "qs";

export async function getBlogList(params) {
  return request(`/api/blog/list?${qs.stringify(params)}`, {
    method: "get"
  });
}
export async function getTaskList(params) {
  return request(`/DataDev/TaskList`,{
    method:"post",
    body: qs.stringify(params),
    headers: new Headers({      
      'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
    }),
    });
}