import { getBlogList } from '../services/index';
import { common } from '~/framework';
const { message } = common;

export default {
  namespace: 'Home1',
  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    //初始化加载
    *Init({ payload }, { call, put }) {
      yield put({
        type: 'loading',
        payload: {
          loading: true,
        },
      });
      const { res, err } = yield call(getBlogList, payload);
      if (res) {
        yield put({
          type: 'loading',
          payload: {
            loading: false,
          },
        });
        yield put({
          type: 'save',
          payload: {
            list: res.data,
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
        list: action.payload.list,
      };
    },
  },
};
