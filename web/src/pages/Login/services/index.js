import request from '~/utils/request';
import qs from 'qs';

//登录
// export function login(params) {
//   return request(`/api/user/login?${qs.stringify(params)}`, {
//     method: "get"
//   });
// }
export async function login(params) {
  return request(`/api/user/login`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json;', // 指定提交方式为表单提交
    }),
  });
}
