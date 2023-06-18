# Develop Client Side and Create login view

## <a href="https://s29.picofile.com/file/8464758984/image.zip.html">Download necessary image for client side</a>

## layouts folder
- ### Create login folder
- ### Create LoginLayout.vue File
```bash
<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
```

## pages folder
- ### Create login folder
- ### Create LoginPage.vue File
```bash
<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Welcome To Open World</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model:model-value="guestUser.username" type="email" label="Email" />
              <q-input square filled clearable v-model:model-value="guestUser.password" type="password" label="Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-8" size="lg" class="full-width" label="login"/>
            <q-btn @click="register" unelevated color="red" size="lg" class="full-width q-ma-sm" label="Register"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    data () {
      const router = useRouter();
      const guestUser = ref({
        username: '',
        password: '',
      });
      return {
        guestUser,
        register() {
          router.replace({name: 'register'})
        },
      }
    }
}
</script>

<style>
.q-page {
  background-image: url(../../image/loginWallpaper.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.q-card {
  width: 400px;
}
</style>
```
- ### Create RegisterPage.vue File
```bash
<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Welcome To Open World</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model:model-value="newUser.name" type="text" label="First Name & Last Name" />
              <q-input square filled clearable v-model:model-value="newUser.email" type="email" label="Email" />
              <q-input square filled clearable v-model:model-value="newUser.password" type="password" label="Password" />
              <q-file filled bottom-slots v-model:model-value="newUser.avatar" label="Avatar" counter>
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="newUser.avatar = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  File Size
                </template>
              </q-file>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-8" size="lg" class="full-width" label="Register"/>
            <q-btn @click="login" unelevated color="red" size="lg" class="full-width q-ma-sm" label="Login"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    data () {
      const router = useRouter();
      const newUser = ref({
        name:  '',
        email: '',
        password: '',
        avatar: []
      });
      return {
        newUser,
        login() {
          router.replace({name: 'login'})
        },
      }
    }
}
</script>

<style>
.q-page {
  background-image: url(../../image/loginWallpaper.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.q-card {
  width: 400px;
}
</style>
```
## router folder
- ### routes.ts
```bash
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
```

