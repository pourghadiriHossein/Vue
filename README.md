# Develop Client Side, Complete Login Mechanism

## In stores , Create auth-store.ts File
```bash
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    expiresAt: 0,
  }),

  getters: {
    isAuthorized(state) {
      return Date.now() < state.expiresAt
    },
  },

  actions: {
    async authenticate(username: string, password: string) {
      const response = await api.post('oauth/token', {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: 1,
        client_secret: 'sL8r8yA2o3yGzbXYeb4xsg7Wie3RmKmUTOTFHVoI',
      });
      if (response.status != 200) {
        throw Error('Request error ' + response.status);
      }
      this.token = response.data.access_token;
      this.expiresAt = Date.now() + response.data.expires_in;
      api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      this.export();
    },
    async logout() {
      this.token = '';
      this.expiresAt = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
    import() {
      this.token = localStorage.getItem('token') ?? '';
      this.expiresAt = parseInt(localStorage.getItem('expiresAt') ?? '0');
      if (this.token.length > 0) {
        api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      }
    },
    export() {
      localStorage.setItem('token', this.token);
      localStorage.setItem('expiresAt', this.expiresAt.toString());
    },
  }
});
```
## In boot
- ### Update axios.ts
```bash
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8000' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  const auth = useAuthStore();
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status == 403) {
        auth.logout();
      }
      throw error;
    }
  );
});

export { api };
```
- ### Create auth.ts File
```bash
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth-store';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(
  async ({ urlPath, redirect } /* { app, router, ... } */) => {
    const auth = useAuthStore();
    auth.import();
    if (urlPath.includes('dashboard') && !urlPath.includes('login')) {
      if (!auth.isAuthorized) {
        redirect({ name: 'login' });
        return;
      }
    } else if (urlPath.includes('login')) {
      if (auth.isAuthorized) {
        redirect({ name: 'dashboard' });
        return;
      }
    }
  }
);
```
- ### Update quasar.config.js File, In boot Array
```bash
boot: [
  'axios',
  'auth',
],
```
## In router, Update routers.ts File
- ### import useAuthStore
```bash
import { useAuthStore } from 'src/stores/auth-store';
```
- ### In LoginLayout.vue path
```bash
beforeEnter(to, from, next) {
  const auth = useAuthStore();
  auth.import();
  if (!auth.isAuthorized) {
    next();
  } else {
    next({ name: 'dashboard' });
  }
},
```
- ### In DashboardLayout.vue path
```bash
beforeEnter(to, from, next) {
  const auth = useAuthStore();
  auth.import();
  if (auth.isAuthorized) {
    next();
  } else {
    next({ name: 'login' });
  }
},
```
## In pages/login, Update LoginPage.vue File
- ### Update q-btn
```bash
<q-btn @click="login" unelevated color="light-blue-8" size="lg" class="full-width" label="login"/>
```
- ### import useAuthStore In script
```bash
import { useAuthStore } from 'src/stores/auth-store'
```
- ### Add useAuthStore in script data
```bash
const authStore = useAuthStore();
```
- ### Add login Function to script return
```bash
login () {
  authStore
  .authenticate(guestUser.value.username, guestUser.value.password)
  .then(() => {
    router.replace({name: 'dashboard'})
  },
  (error) => {
    console.log(`No Internet, Connection Lost because server not serve!!!\n${error}`);
  })
},
```
## In layouts/dashboard , Update DashboardLayout.vue File
- ### Update logout q-btn
```bash
<q-btn class="full-width" label="Logout" color="red" @click="logout"/>
```
- ### import useAuthStore
```bash
import { useAuthStore } from 'src/stores/auth-store'
```
- ### import useRouter
```bash
import { useRouter } from 'vue-router';
```
- ### Add useAuthStore in script data
```bash
const authStore = useAuthStore();
```
- ### Add router in script data
```bash
const router = useRouter();
```
- ### Add logout Function to script return
```bash
logout() {
  authStore.logout();
  router.replace({ name: 'login' });
},
```
