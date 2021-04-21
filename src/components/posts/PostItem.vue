<template>
  <base-card>
    <h1>
      <router-link :to="{ name: 'comments', params: { postId: id } }">
        {{ title }}
      </router-link>
    </h1>

    <p>{{ text }}</p>
    <footer>
      <div class="publish-date">
        22MART21 10:15AM
      </div>
      <span class="user-info" @click="usernameClickHandler(userId)">
        Username {{ userId }}
        <img v-bind:src="image" alt="user" class="user-image" />
      </span>
    </footer>
  </base-card>
</template>

<script>
export default {
  props: ['id', 'title', 'text', 'userId', 'image'],
  emits: ['show-user-dialog'],
  data() {
    return {
      showUserDialog: false
    };
  },
  methods: {
    usernameClickHandler(userId) {
      this.$emit('show-user-dialog', userId);
    }
  }
};
</script>

<style scoped>
h1::first-letter,
p::first-letter {
  text-transform: uppercase;
}

a:hover {
  color: var(--mainBlue);
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 900;
}

.user-info:hover {
  color: var(--mainBlue);
}

.user-image {
  object-fit: cover;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
}

.publish-date {
  flex: 1;
}
</style>
