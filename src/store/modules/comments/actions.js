export default {
  async fetchComments(context, payload) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${payload.postId}/comments`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const data = await response.json();

    context.commit('addComments', data);
  }
};
