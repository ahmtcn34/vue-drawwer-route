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
    // Hem Home hem de About için ortak modal rotası
    {
        path: '/modal/:modalType/:id?',
        name: 'Modal',
        components: {
            default: Home, // Varsayılan olarak Home - beforeEnter'da kontrol edilecek
            modal: () => import('@/components/modal.vue')
        },
        // beforeEnter guard'ı ile hangi default view'ın gösterileceğini belirleriz
        beforeEnter: (to, from, next) => {
            // from rotasının adına göre hangi view gösterilecek belirlenir
            const fromRouteName = from.name?.toString() || '';

            // Eğer About sayfasından geliyorsa, meta verisine kaydet
            if (fromRouteName.includes('About')) {
                to.meta.view = 'about';
            } else {
                to.meta.view = 'home';
            }
            next();
        }
    },
    // About sayfasından açılan modallar için özel bir yönlendirme rotası
    {
        path: '/modal/:modalType/:id?',
        name: 'ModalFromAbout',
        components: {
            default: () => import('@/views/about.vue'), // About sayfası için
            modal: () => import('@/components/modal.vue')
        },
        beforeEnter: (to, _, next) => {
            // Meta verisine about olduğunu kaydet
            to.meta.view = 'about';
            next();
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Globally handle modal navigation to keep consistency
router.beforeEach((to, from, next) => {
    // Eğer modal rotasına gidiliyorsa ve from about ise, ModalFromAbout'a yönlendir
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
