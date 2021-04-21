export default {
  getActivePostComments(state, _, _2, rootGetters) {
    return state.comments.filter(
      comment => comment.postId === rootGetters.activePostId
    );
  }
};
