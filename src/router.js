import { createRouter, createWebHistory } from 'vue-router';

// Pages
import PostsList from './pages/posts/PostsList';
import PostDetails from './pages/posts/PostDetails';
import UserAuth from './pages/auth/UserAuth';
import NotFound from './pages/NotFound';

import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/posts'
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsList,
      meta: { requiresAuth: true }
    },
    {
      path: '/posts/:postId/comments',
      name: 'comments',
      component: PostDetails,
      meta: { requiresAuth: true },
      props: route => {
        const postId = Number.parseInt(route.params.postId);
        if (Number.isNaN(postId) || postId < 1) {
          router.push({ name: 'posts' });
        }
        return { postId };
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnauth: true }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next({ name: 'auth' });
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next({ name: 'posts' });
  } else {
    next();
  }
});

export default router;
