import request from '../../../utils/request';
import qs from 'qs';

export async function getBlogList(params) {
  return request(`/api/blog/list?${qs.stringify(params)}`, {
    method: 'get',
  });
}
export async function delBlog(params) {
  return request(`/api/blog/del`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json;', // 指定提交方式为表单提交
    }),
  });
}
