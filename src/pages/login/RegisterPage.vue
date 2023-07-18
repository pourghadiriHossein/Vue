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
