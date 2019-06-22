import router from 'umi/router';

export default {
  namespace: 'Global',
  state: {
    userOrg: [], //组织项目数据
    loginName: '',
    userId: '',
    currentProjectName: '',
    currentProjectId: '',
    currentOrgId: '',
    roleMenu: [], //权限菜单
    currentMenu: '',
    currentSider: '',
    sessionId: '',
    author: localStorage.getItem('author'),
    realname: localStorage.getItem('realname'),
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname !== '/Login' && pathname !== '/' && pathname !== '/Register') {
          if (!localStorage.getItem('author')) {
            router.replace('/Login');
          }
        }
      });
    },
  },

  effects: {},

  reducers: {
    saveAuthor(state, { params }) {
      return {
        ...state,
        author: params.author,
        realname: params.realname,
      };
    },
  },
};
