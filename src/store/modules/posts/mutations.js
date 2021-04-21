export default {
  setPosts(state, payload) {
    state.posts = payload;
  },
  addPosts(state, payload) {
    state.posts = [...state.posts, ...payload];
  },
  setActivePostData(state, payload) {
    state.activePostData = payload;
  },
  setActivePostId(state, payload) {
    state.activePostId = payload.id;
  }
};
