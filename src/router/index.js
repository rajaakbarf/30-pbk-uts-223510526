// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../views/Todos.vue';
import Post from '../views/Post.vue';
import Albums from '../views/Albums.vue';
import AlbumsDetail from '../views/AlbumsDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/todos', name: 'Todos', component: Todos },
    { path: '/post', name: 'Post', component: Post },
    { path: '/albums', name: 'Albums', component: Albums },
    { path: '/albums/:albumId', name: 'AlbumsDetail', component: AlbumsDetail, props: true },
  ],
});

export default router;