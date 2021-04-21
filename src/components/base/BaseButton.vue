<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
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
      default: '/'
    }
  }
};
</script>

<style scoped>
button,
a {
  font-family: inherit;
  background-color: var(--mainWhite);
  border: none;
  color: var(--mainBlack);
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
  margin: 0 auto;
}
button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 900;
}

a {
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}

button:hover,
button:active {
  background: var(--mainBlack);
  color: var(--mainYellow);
}

a:disabled,
button:disabled {
  color: var(--mainYellow);
  background: var(--whiteTransparent);
}

.flat {
  background-color: transparent;
  color: var(--mainBlack);
  border: none;
}

.outline {
  background-color: transparent;
}
</style>
