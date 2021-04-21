import { createStore } from 'vuex';

import postsModule from './modules/posts/index';
import commentsModule from './modules/comments/index';
import authModule from './modules/auth/index';
import usersModule from './modules/users/index';

const store = createStore({
  modules: {
    posts: postsModule,
    comments: commentsModule,
    auth: authModule,
    users: usersModule
  },
  state() {
    return {
      page: 0,
      pageLimit: false
    };
  },
  actions: {
    setNextPage(context) {
      if (!this.pageLimit) {
        context.commit('setNextPageNum');
      }
    },
    setPageLimit(context) {
      context.commit('setPageLimitNum');
    }
  },
  getters: {
    getPage(state) {
      return state.page;
    },
    getPageLimit(state) {
      return state.pageLimit;
    }
  },
  mutations: {
    setNextPageNum(state) {
      if (!state.pageLimit) state.page++;
    },
    setPageLimitNum(state) {
      state.pageLimit = true;
    }
  }
});

export default store;
