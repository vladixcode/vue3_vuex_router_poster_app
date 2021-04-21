export default {
  setComments(state, payload) {
    state.comments = payload;
  },
  addComments(state, payload) {
    state.comments = [...state.comments, ...payload];
  }
};
