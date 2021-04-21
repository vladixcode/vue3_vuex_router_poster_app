<template>
  <article class="card" :class="cssClass">
    <slot></slot>
  </article>
</template>

<script>
export default {
  props: {
    cssClass: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style scoped>
article {
  padding: 2rem 3rem;
  border-bottom: 1px solid var(--olive);
  background: var(--mainYellow);
}

.card {
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--olive);
  background: var(--mainYellow);
}

.comment {
  padding: 1rem;
  background: var(--marigoldYellow);
}

.light {
  background: var(--marigoldYellow);
}

.error {
  text-align: center;
  background: var(--marigoldYellow);
}

.auth {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog-info {
  display: flex;
}

a:hover {
  color: var(--mainBlue);
}

@media screen and (min-width: 600px) {
  article {
    padding: 2rem 10rem;
  }
}
</style>
