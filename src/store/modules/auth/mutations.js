export default {
  setAuth(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userAutoLogout = false;
  },
  setAutoLogout(state) {
    state.userAutoLogout = true;
  }
};
