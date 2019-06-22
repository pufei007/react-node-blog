import { register } from '../services/index';
import { common } from '~/framework';
import router from 'umi/router';
const { notification, message } = common;

export default {
  namespace: 'Register',

  state: {
    registerStatus: false,
    registerName: '',
  },

  effects: {
    *Register({ payload }, { call, put }) {
      const { res, err } = yield call(register, payload);
      if (res && res.errno === 0) {
        message.success('注册成功');
        yield put({
          type: 'saveStatus',
          payload: {
            registerStatus: true,
            registerName: payload.username,
          },
        });

        return res;
      } else {
        if (res.errno === -1 && res.message) {
          notification.error(res.message, '错误');
        } else {
          notification.error('注册失败', '错误');
        }
        return res;
      }
    },
  },

  reducers: {
    saveStatus(state, action) {
      return {
        ...state,
        registerStatus: action.payload.registerStatus,
        registerName: action.payload.registerName,
      };
    },
    cleanStatus(state, action) {
      return { ...state, registerStatus: false, registerName: '' };
    },
  },
};
