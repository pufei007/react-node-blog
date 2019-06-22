import { getBlogList, delBlog } from '../services/index';
import { common } from '~/framework';
const { message } = common;

export default {
  namespace: 'Admin',
  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    //初始化加载
    *Init({ payload }, { call, put }) {
      const { res, err } = yield call(getBlogList, payload);
      if (res && res.errno === 0) {
        yield put({
          type: 'save',
          payload: {
            list: res.data ? res.data : [],
          },
        });
      }
    },
    *DelBlog({ payload }, { call, put }) {
      const { res, err } = yield call(delBlog, payload);
      if (res && res.errno === 0) {
        message.success('删除成功', 2);
        return res;
      } else {
        message.error('删除失败', 2);
      }
    },
  },

  reducers: {
    loading(state, action) {
      return { ...state, loading: action.payload.loading };
    },
    //保存初始数据
    save(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  },
};
