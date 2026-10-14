import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MoviesView from '@/views/MoviesView.vue'
import Movie from '@/views/Movie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/log-in',
      name: 'log-in',
      component: Login,
    },
    {
      path: '/',
      redirect: '/movies',
    },
    {
      path: '/movies/:id',
      name: 'moviesId',
      component: Movie,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
    },
  ],
})

export default router
