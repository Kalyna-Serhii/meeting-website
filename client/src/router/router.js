import {createRouter, createWebHistory} from 'vue-router';
import VueCookies from 'vue-cookies';
import store from '@/store/store';
import api from "@/api";

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
            path: '/login',
            component: () => import('../pages/LoginPage.vue'),
            meta: {
                title: 'Login',
                authNotRequired: true
            }
        },
        {
            path: '/register',
            component: () => import('../pages/RegistrationPage.vue'),
            meta: {
                title: 'Registration',
                authNotRequired: true
            }
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    document.title = to.meta?.title ?? '';
    if (!to.matched.some(route => route.meta.authNotRequired)) {
        if (!VueCookies.get('accessToken')) {
            return next(redirectToLogin(to.fullPath));
        } else {
            if (!store.state.currentUser) {
                try {
                    store.state.currentUser =
                        await api.userApi.getUserByToken();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    next();
});

function redirectToLogin(successfulLoginRedirectTo) {
    return {
        path: '/login',
        query: {
            redirect: successfulLoginRedirectTo
        }
    }
}

export default router