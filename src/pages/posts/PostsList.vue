<template>
  <base-dialog
    :show="showDialog"
    :position="scrollY + 30"
    @close="hideUserDialog"
    title="winQuest"
  >
    <base-card>
      <section class="user-info profile">
        <span class="info">
          <img
            src="https://static.theprint.in/wp-content/uploads/2020/11/Jack-Ma.jpg"
            :alt="selectedUserData.name"
            class="profile-image"
          />
        </span>
        <span class="info-data"
          ><h1>Username {{ selectedUserData.id }}</h1></span
        >
      </section>
    </base-card>
    <base-card class="light">
      <section class="user-info">
        <span class="info">name</span>
        <span class="info-data">{{ selectedUserData.name }}</span>
      </section>
    </base-card>
    <base-card class="light">
      <section class="user-info">
        <span class="info">address</span>
        <ul class="info-data">
          <li v-for="(items, index) in selectedUserData.address" :key="index">
            <span> {{ items }} </span>
          </li>
        </ul>
      </section>
    </base-card>
    <base-card class="light">
      <section class="user-info">
        <span class="info">company</span>
        <span class="info-data">{{ selectedUserData.company }}</span>
      </section>
    </base-card>

    <base-card
      v-for="(post, index) in selectedUserData.posts"
      :key="index"
      class="light"
    >
      <h1>{{ post.title }}</h1>
      <span>22MAR21 10:15</span>
    </base-card>
  </base-dialog>

  <post-item
    v-for="(post, index) in posts"
    :key="index"
    :id="post.id"
    :title="post.title"
    :text="post.body"
    :userId="post.userId"
    :image="post.image"
    @show-user-dialog="showDialogHandler"
  ></post-item>
  <base-loading v-if="isLoading"></base-loading>
</template>

<script>
import PostItem from '../../components/posts/PostItem.vue';

export default {
  components: {
    PostItem
  },
  data() {
    return {
      isLoading: false,
      isLoadingUserData: false,
      showDialog: false,
      scrollY: 0
    };
  },
  computed: {
    posts() {
      return this.$store.getters['getAllPosts'];
    },
    page() {
      return this.$store.getters['getPage'];
    },
    pageLimit() {
      return this.$store.getters['getPageLimit'];
    },
    users() {
      return this.$store.getters['users/getAllUsers'];
    },
    selectedUserData() {
      return this.$store.getters['users/getDialogUserData'];
    }
  },
  methods: {
    async loadPosts(page = 1, refresh = false) {
      if (this.pageLimit) {
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchPosts', {
          page,
          forceRefresh: refresh
        });
      } catch (err) {
        this.error = err.message;
      }
      this.isLoading = false;
      this.$store.dispatch('setNextPage');
    },
    async loadUserData(userId) {
      this.isLoadingUserData = true;
      try {
        await this.$store.dispatch('users/fetchUserData', {
          userId
        });
      } catch (err) {
        this.error = err.message;
      }
      this.isLoadingUserData = false;
      this.showDialog = true;
    },
    showDialogHandler(userId) {
      this.$store.dispatch('users/setSelectedUserId', {
        userId
      });
      if (!this.selectedUserData) {
        this.loadUserData(userId);
      } else {
        this.showDialog = true;
      }
    },
    hideUserDialog() {
      this.showDialog = false;
    },
    addScrollListener() {
      window.addEventListener('scroll', () => {
        if (!this.showDialog) {
          this.scrollY = window.scrollY;
        }
      });
    }
  },
  created() {
    if (this.page === 0) {
      this.loadPosts();
    }
  },
  mounted() {
    this.addScrollListener();
  },
  watch: {
    scrollY() {
      if (
        !this.isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
      ) {
        this.loadPosts(this.page + 1);
      }
    }
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
}
.profile {
  align-items: center;
}
h1 {
  font-size: 1.5rem;
}
h1::first-letter {
  text-transform: uppercase;
}
.info {
  text-transform: uppercase;
  width: 5rem;
  display: flex;
  justify-content: flex-end;
}
.info-data {
  font-weight: 800;
  margin-left: 2rem;
}
/* Medium devices (landscape tablets, 768px and up) */
@media screen and (min-width: 768px) {
  .info {
    width: 10rem;
  }
  h1 {
    font-size: 2rem;
  }
}
</style>
