<template>
  <section v-if="hasPost">
    <base-card>
      <section class="post-info">
        22MAR21 10:15
        <section class="post-publisher-info">
          <span>Username {{ post.userId }}</span>
          <img class="profile-image" :src="post.image" :alt="post.title" />
        </section>
      </section>
    </base-card>
    <base-card>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </base-card>
  </section>
  <section v-if="hasComments">
    <base-card>
      <h1 class="blue">Comments:</h1>
    </base-card>
    <base-card
      v-for="(comment, index) in comments"
      :key="index"
      class="comment"
    >
      <section class="comment-item">
        <img
          class="profile-image"
          src="https://www.connexionfrance.com/var/connexion/storage/images/_aliases/articleimage/media/images/a-horse-in-an-enclosure/1120111-1-eng-GB/A-horse-in-an-enclosure.jpg"
          alt="comment_image"
        />
        <section class="comment-body">
          <header class="comment-header">
            <p>
              <span class="comment-username blue"
                >Username {{ index + 1 }}</span
              >
              commented on 22MAR21 10:15
            </p>
          </header>
          <p>{{ comment.body + '...' }}</p>
        </section>
      </section>
    </base-card>
  </section>
  <section v-if="isLoading || isLoadingComments">
    <base-loading></base-loading>
  </section>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      isLoadingComments: false,
      error: null
    };
  },
  computed: {
    hasPost() {
      return !this.isLoading && this.$store.getters['getActivePost'];
    },
    post() {
      return this.$store.getters['getActivePost'];
    },
    hasComments() {
      return (
        !this.isLoadingComments &&
        this.$store.getters['comments/getActivePostComments']
      );
    },
    comments() {
      return this.$store.getters['comments/getActivePostComments'];
    }
  },
  methods: {
    getPost() {
      if (!this.post) {
        this.loadPost(this.postId);
      }
    },
    getPostComments() {
      if (!this.comments.length) {
        this.loadComments(this.postId);
      }
    },
    async loadComments(postId, refresh = false) {
      this.isLoadingComments = true;
      try {
        await this.$store.dispatch('comments/fetchComments', {
          postId,
          forceRefresh: refresh
        });
      } catch (err) {
        this.error = err.message;
      }
      this.isLoadingComments = false;
    },
    async loadPost(postId, refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchOnePost', {
          postId,
          forceRefresh: refresh
        });
      } catch (err) {
        this.error = err.message;
      }
      this.isLoading = false;
    },
    setActivePost() {
      this.$store.dispatch('setActivePostId', {
        id: this.postId
      });
    }
  },
  created() {
    this.setActivePost();
    this.getPost();
    this.getPostComments();
  }
};
</script>

<style scoped>
h1::first-letter,
p::first-letter {
  text-transform: uppercase;
}

.post-publisher-info,
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-publisher-info span {
  font-weight: 800;
  margin-right: 0.5rem;
}

.comment-item {
  display: flex;
}
.comment-body {
  margin-left: 1rem;
}
.comment-header {
  font-weight: 800;
}

.blue {
  color: var(--mainBlue);
}

.profile-image {
  object-fit: cover;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
}
</style>
