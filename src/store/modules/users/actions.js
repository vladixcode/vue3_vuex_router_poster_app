export default {
  async fetchUserData(context, payload) {
    const response = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${payload.userId}`)
        .then(response => response.json())
        .then(data => data),
      fetch(
        `https://jsonplaceholder.typicode.com/users/${payload.userId}/posts`
      )
        .then(response => response.json())
        .then(data => data)
    ]);

    const userData = {
      id: response[0].id,
      name: response[0].name,
      address: {
        street: response[0].address.street,
        suite: response[0].address.suite,
        city: response[0].address.city,
        zipcode: response[0].address.zipcode
      },
      company: response[0].company.name
    };

    const userPosts = response[1].map(post => {
      return {
        userId: post.userId,
        title: post.title
      };
    });

    context.commit('addUser', userData);
    context.commit('addUserPosts', userPosts);
  },
  setSelectedUserId(context, payload) {
    context.commit('setSelectedUserId', payload.userId);
  }
};
