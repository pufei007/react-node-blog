import { getBlogList } from '../services/index';
import { common } from '~/framework';
const { message } = common;

export default {
  namespace: 'Detail',
  state: {
    detail: {},
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
            detail: res.data ? res.data : {},
          },
        });
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
        detail: action.payload.detail,
      };
    },
  },
};
