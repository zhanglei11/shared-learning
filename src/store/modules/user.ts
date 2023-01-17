import { Module } from 'vuex';
interface State {
  userInfo: any; //展开收起
  dictionaryInfo: any; //展开收起
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      dictionaryInfo:{}
    };
  },
  getters: {
    userInfo: (state) => state.userInfo,
    dictionaryInfo: (state) => state.dictionaryInfo
  },
  // 只能同步
  mutations: {
    toggleUserInfo(state, type) {
      state.userInfo = type;
    },
    toggleDictionaryInfo(state, type) {
      state.dictionaryInfo = type;
    }
  },
  // 支持异步,可以考虑引入API
  actions: {
    toggleUserInfo({ commit }, type) {
      commit('toggleUserInfo', type);
    },
    toggleDictionaryInfo({ commit }, type) {
      commit('toggleDictionaryInfo', type);
    }
  }
};

export default store;
