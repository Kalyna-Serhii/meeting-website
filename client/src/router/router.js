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
        const state = localStorage.getItem('isAuth');
        const boolState = !(state === 'false' || state === null);
        if (!boolState) {
            return next(redirectToLogin(to.fullPath));
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