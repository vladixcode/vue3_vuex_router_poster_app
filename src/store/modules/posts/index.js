import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state() {
    return {
      posts: [],
      activePostId: null,
      activePostData: null
    };
  },
  mutations,
  actions,
  getters
};
