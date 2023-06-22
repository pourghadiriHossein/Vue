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
