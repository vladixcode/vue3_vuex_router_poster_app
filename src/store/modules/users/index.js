import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      users: [],
      userPosts: [],
      selectedUserId: null
    };
  },
  mutations,
  actions,
  getters
};
