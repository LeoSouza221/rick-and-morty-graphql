import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/episodes',
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component() {
      return import('../views/episodes/Episodes.vue');
    },
  },
  {
    path: '/characters',
    name: 'Characters',
    component() {
      return import('../views/characters/Characters.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
