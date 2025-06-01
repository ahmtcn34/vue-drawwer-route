import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';
import UserDetailDrawer from '@/components/user-detail-drawwer.vue';
import About from '@/views/about.vue';

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
            drawer: UserDetailDrawer
        },
    },
    {
        path: '/about',
        name: 'About',
        components: {
            default: About,
        },
    },
    {
        path: '/about/drawer/:drawerType/:id?',
        name: 'AboutDrawer',
        components: {
            default: About,
            drawer: UserDetailDrawer
        },
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
