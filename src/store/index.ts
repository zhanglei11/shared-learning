import { createStore } from 'vuex';
import settings from './modules/settings';
import tagsBar from './modules/tagsBar';
import menus from './modules/menus'
import user from './modules/user'
// import { createVuexPersistedState } from "vue-persistedstate";
const store = createStore({
  modules: {
    settings: settings,
    tagsBar: tagsBar,
    menus: menus,
    user: user
  },
  // plugins: [createVuexPersistedState({
  //   key: 'vuex',
  //   storage: window.localStorage,
  //   whiteList: [],
  //   blackList: [],
  // })]

});

export default store;
