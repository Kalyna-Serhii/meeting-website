import {createRouter, createWebHistory} from 'vue-router'

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
        {
            path: '/auth',
            component: () => import('../pages/AuthPage.vue'),
            meta: {
                title: 'Authorization'
            }
        },
        {
            path: '/logout',
            component: () => import('../pages/LogoutPage.vue'),
            meta: {
                title: 'Logout'
            }
        },
        {
            path: '/profile',
            component: () => import('../pages/ProfilePage.vue'),
            meta: {
                title: 'Profile'
            }
        },
        {
            path: '/user/:id',
            component: () => import('../pages/UserPage.vue'),
            meta: {
                title: 'User'
            }
        },
    ]
})

router.beforeEach(to => {
    document.title = to.meta?.title ?? ''
})

export default router