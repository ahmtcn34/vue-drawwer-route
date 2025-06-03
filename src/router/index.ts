import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        components: {
            default: Home,
        },
    },

    {
        path: '/users/:id/edit',
        name: 'UserDrawer',
        components: {
            default: Home,
            drawer: () => import('@/components/user-detail-drawer.vue')
        },
    },
    {
        path: '/about',
        name: 'About',
        components: {
            default: () => import('@/views/about.vue'),
        },
    },
    {
        path: '/about/drawer/:drawerType/:id?',
        name: 'AboutDrawer',
        components: {
            default: () => import('@/views/about.vue'),
            drawer: () => import('@/components/user-detail-drawer.vue')
        },
    },
    {
        path: '/modal/:modalType/:id?',
        name: 'Modal',
        components: {
            default: Home,
            modal: () => import('@/components/modal.vue')
        },
        beforeEnter: (to, from, next) => {
            const fromRouteName = from.name?.toString() || '';

            if (fromRouteName.includes('About')) {
                to.meta.view = 'about';
            } else {
                to.meta.view = 'home';
            }
            next();
        }
    },
    {
        path: '/modal/:modalType/:id?',
        name: 'ModalFromAbout',
        components: {
            default: () => import('@/views/about.vue'),
            modal: () => import('@/components/modal.vue')
        },
        beforeEnter: (to, _, next) => {
            to.meta.view = 'about';
            next();
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Modal' && from.name?.toString().includes('About')) {
        next({
            name: 'ModalFromAbout',
            params: to.params,
            query: to.query
        });
        return;
    }
    next();
});

export default router;
