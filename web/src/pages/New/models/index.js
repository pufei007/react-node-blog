import { newBlog ,updateBlog} from '../services/index';
import { common } from '~/framework';
const { message } = common;

export default {
  namespace: 'New',
  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    //初始化加载
    *NewBlog({ payload }, { call, put }) {
      const { res, err } = yield call(newBlog, payload);
      if (res&&res.errno===0) {
        message.success('发布文章成功',2)
      }else{
        message.error('发布文章失败',2)
      }
    },
    *UpdateBlog({ payload }, { call, put }) {
      const { res, err } = yield call(updateBlog, payload);
      if (res&&res.errno===0) {
        message.success('编辑文章成功',2)
      }else{
        message.error('编辑文章失败',2)
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
