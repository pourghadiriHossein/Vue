import { route } from 'quasar/wrappers';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/login/LoginLayout.vue'),
    redirect: <any> route( <any> {name: 'login'} ),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login/LoginPage.vue')
       },
       {
        path: 'register',
        name: 'register',
        component: () => import('pages/login/RegisterPage.vue')
       },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('src/layouts/dashboard/DashboardLayout.vue'),
    children: [
      {
        path: 'index',
        name: 'dashboard',
        component: () => import('src/pages/dashboard/DashboardPage.vue'),
      },
      {
        path: 'myPosts',
        name: 'myPosts',
        component: () => import('src/pages/dashboard/MyPostsPage.vue'),
      },
      {
        path: 'allPosts',
        name: 'allPosts',
        component: () => import('src/pages/dashboard/AllPostsPage.vue'),
      },
      {
        path: 'allUsers',
        name: 'allUsers',
        component: () => import('src/pages/dashboard/AllUsersPage.vue'),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
