import { login } from "../services/index";
import { common } from "~/framework";
import router from "umi/router";
import { message } from "antd";
const { notification } = common;

export default {
  namespace: "Login",

  state: {
    loginStatus: false
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save" });
    },
    *Login({ payload }, { call, put }) {
      const { res, err } = yield call(login, payload);
      if (res&&res.errno===0) {
        message.success('登录成功',3)
        return res;
      } else {
        notification.error('登录失败，请重试', "错误");
        return res;
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveLoginStatus(state, action) {
      return { ...state, ...action.loginStatus };
    }
  }
};
