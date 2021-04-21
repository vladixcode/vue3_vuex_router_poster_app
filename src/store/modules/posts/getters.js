export default {
  getAllPosts(state) {
    return state.posts;
  },
  getActivePost(state, _, _2, rootGetters) {
    const activePostId = rootGetters.activePostId;
    if (state.activePostData?.id === activePostId) {
      return state.activePostData;
    } else {
      return state.posts.find(post => post.id === activePostId);
    }
  },
  activePostId(state) {
    return state.activePostId;
  }
};
