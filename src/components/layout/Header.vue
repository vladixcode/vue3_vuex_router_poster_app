<template>
  <header>
    <nav class="navbar">
      <Logo link />
      <ul v-if="isLoggedin" class="nav-links">
        <li @click="logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from './Logo';
export default {
  components: {
    Logo
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.replace({ name: 'auth' });
    },
    isLoggedin() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
}
.navbar {
  position: fixed;
  width: 100%;
  background: var(--mainYellow);
  color: var(--mainWhite);
  height: 5rem;
  padding: 0 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--olive);
}

.rotate2 {
  position: absolute;
  transform: rotate(-20deg);
  width: 20px;
}

a {
  color: var(--mainWhite);
}

h1 {
  font-size: 2em;
  text-transform: none !important;
}

.nav-links {
  display: flex;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: 900;
}

.nav-links li:hover {
  color: var(--mainBlack);
}

/* Medium devices (landscape tablets, 768px and up) */
@media screen and (min-width: 768px) {
  .navbar {
    max-width: var(--maxWidthContentTablet);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media screen and (min-width: 992px) {
  .navbar {
    max-width: var(--maxWidthContentDesktops);
  }
}
</style>
