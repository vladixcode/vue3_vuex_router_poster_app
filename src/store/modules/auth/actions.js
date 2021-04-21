let authTimer;
const webApiKey = 'AIzaSyCi5qFazQBhlZ2VaBSdBRQf8Fbz0HIujKs';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async register(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'register'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey}`;

    if (mode === 'register') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message);
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    //localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('userId', 1);
    localStorage.setItem('tokenExpiration', expirationDate);

    authTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setAuth', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    authTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setAuth', {
        token,
        userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(authTimer);

    context.commit('setAuth', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
