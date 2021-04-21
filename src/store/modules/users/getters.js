export default {
  getAllUsers(state) {
    return state.users;
  },
  getDialogUserData(state) {
    const userData = state.users?.find(
      user => user.id === state.selectedUserId
    );
    if (userData) {
      userData.posts = state.userPosts?.filter(
        post => (post.userId = state.selectedUserId)
      );
    }
    return userData;
  }
};
