<template>
  <Header v-if="loggedin" />
  <main :class="[!loggedin ? 'login' : '']">
    <router-view></router-view>
  </main>
</template>

<script>
import Header from './components/layout/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      loginClass: 'login'
    };
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  computed: {
    loggedin() {
      return this.isLoggedIn();
    },
    isUserAutoLogout() {
      return this.$store.getters['auth/isAutoLogout'];
    }
  },
  created() {
    this.$store.dispatch('auth/autoLogin');
  },
  watch: {
    isUserAutoLogout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace({ name: 'auth' });
      }
    }
  }
};
</script>

<style>
/*
======
Variables
======
*/
:root {
  --mainYellow: #ffde00;
  --marigoldYellow: #fbeb7d;
  --dialogOverlay: #fdf6c4d7;
  --mainBlue: #00aeef;
  --olive: #806f00;
  --absoluteTransparent: #ffffff00;
  --whiteTransparent: #ffffff91;

  --maxWidthContentTablet: 40rem;
  --maxWidthContentDesktops: 60rem;

  --primaryLightColor: #d4e6a5;
  --primaryColor: #476a2e;
  --primaryDarkColor: #c02c03;
  --mainWhite: #fff;
  --offWhite: #f7f7f7;
  --mainBackground: #f1f5f8;
  --mainOverlay: rgba(35, 10, 36, 0.4);
  --mainBlack: #222;
  --mainGrey: #ececec;
  --darkGrey: #afafaf;
  --mainRed: #bd0303;
  --mainTransition: all 0.3s linear;
  --mainSpacing: 0.2rem;
  --lightShadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
  --darkShadow: 4px 10px 5px 0px rgba(0, 0, 0, 0.5);
  --mainBorderRadius: 0.25rem;
  --smallWidth: 85vw;
  --maxWidth: 40rem;
  --fullWidth: 1170px;
}
/*
======
Global Styles
======
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;800&display=swap');

body {
  font-family: 'Exo 2', sans-serif;
  color: var(--mainBlack);
  line-height: 1.4;
  font-size: 1rem;
  font-weight: 300;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--slantedFont);
}
p {
  margin-bottom: 1.25rem;
}
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: var(--mainBlack);
}
img {
  width: 100%;
  display: block;
}

/*
======
App Styles
======
*/

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  padding-top: 5rem;
  margin: 0 auto;
}

.login {
  max-width: 100%;
  padding: 0;
}

.profile-image {
  object-fit: cover;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
}

/* Medium devices (landscape tablets, 768px and up) */
@media screen and (min-width: 768px) {
  main {
    max-width: var(--maxWidthContentTablet);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media screen and (min-width: 992px) {
  main {
    max-width: var(--maxWidthContentDesktops);
  }
}
</style>
