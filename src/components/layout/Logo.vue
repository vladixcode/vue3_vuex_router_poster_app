<template>
  <h1 v-if="!link" :class="type">
    winQuest
  </h1>
  <h1 v-else :class="type">
    <router-link :to="{ name: to }">winQuest</router-link>
  </h1>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: 'posts'
    }
  }
};
</script>

<style scoped>
a {
  color: var(--mainWhite);
}
a:hover {
  color: var(--mainBlack);
}

.login-logo {
  font-size: 3rem;
  color: var(--mainWhite);
  justify-self: center;
}
</style>
