import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import Create from '../views/Create.vue'
import Show from '../views/Show.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('apollo-token') === null) {
                // next({name: 'Login'});
                router.replace('/login');
                location.reload();

            } else {
                next();
            }
        }
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit,
        props: true,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('apollo-token') === null) {
                // next({name: 'Login'});
                router.replace('/login');
                location.reload();

            } else {
                next();
            }
        }

    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('apollo-token') === null) {
                // next({name: 'Login'});
                router.replace({name: "Login"});

            } else {
                next();
            }
        }

    },
    {
        path: '/show/:id',
        name: 'Show',
        component: Show,
        props: true,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('apollo-token') === null) {
                // next({name: 'Login'});
                router.replace('/login');
                location.reload();

            } else {
                next();
            }
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,

    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.name === 'Home' || to.fullPath === '/create' || to.name === 'Edit' || to.name === 'Show') {
//         if (!store.state.authenticated) {
//             next('/login');
//             location.reload();
//
//         }
//     }
//     if (to.fullPath === '/login') {
//         if (store.state.accessToken) {
//             next('/');
//             location.reload();
//
//         }
//     }
//     next();
// });

export default router
