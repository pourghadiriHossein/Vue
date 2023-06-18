import { route } from 'quasar/wrappers';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/login/LoginLayout.vue'),
    redirect: <any> route( <any> {name: 'login'} ),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/login/LoginPage.vue')
       },
       {
        path: '/register',
        name: 'register',
        component: () => import('pages/login/RegisterPage.vue')
       },
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
