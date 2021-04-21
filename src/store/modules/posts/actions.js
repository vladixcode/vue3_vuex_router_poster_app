export default {
  async fetchPosts(context, payload) {
    const perPage = 10;
    const queryString = `_limit=${perPage}&_page=${payload.page}`;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?${queryString}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch Posts');
    }

    if (data.length === 0) {
      context.dispatch('setPageLimit');
      return;
    }

    const posts = data.map(item => {
      return {
        ...item,
        image:
          'https://static.theprint.in/wp-content/uploads/2020/11/Jack-Ma.jpg'
      };
    });
    context.commit('addPosts', posts);
  },
  async fetchOnePost(context, payload) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${payload.postId}`
    );
    const postData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    postData.image =
      'https://static.theprint.in/wp-content/uploads/2020/11/Jack-Ma.jpg';

    context.commit('setActivePostData', postData);
  },
  setActivePostId(context, payload) {
    context.commit('setActivePostId', {
      id: payload.id
    });
  },
  setActivePostData(context, payload) {
    context.commit('setActivePostData', {
      payload
    });
  }
};
