import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/HomePage.vue'),
      meta: {
        title: 'Home'
      }
    },
  ]
})

router.beforeEach(to => {
  document.title = to.meta?.title ?? ''
})

export default router