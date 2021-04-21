export default {
  addUser(state, payload) {
    state.users.push(payload);
  },
  addUserPosts(state, payload) {
    state.userPosts = [...state.userPosts, ...payload];
  },
  setSelectedUserId(state, payload) {
    state.selectedUserId = payload;
  }
};
