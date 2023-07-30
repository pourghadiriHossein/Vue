<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        Menu

        <q-toolbar-title>
          <q-avatar>
            <img src="../../image/logo.png" />
          </q-avatar>
        </q-toolbar-title>
        Profile
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
      <q-list separator v-if="profile.role == 'admin'">
        <q-item
          v-for="(item, index) in accessMenu"
          :key="index"
          :to="{ name: item.route }"
          v-ripple
          clickable
        >
          <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
          <q-item-section>
            <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list separator v-else>
        <q-item
          v-for="(item, index) in accessMenu.slice(0,2)"
          :key="index"
          :to="{ name: item.route }"
          v-ripple
          clickable
        >
          <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
          <q-item-section>
            <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" elevated>
      <!-- drawer content -->
      <div class="avatarBox row items-center justify-center">
        <q-avatar size="150px" class="overlapping">
          <q-img :src="profile.avatar"></q-img>
        </q-avatar>
      </div>
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <q-card flat bordered class="my-card text-center">
          <q-card-section>
            <div class="text-h3">Profile</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">User Name</div>
            {{ profile.username }}
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">E-Mail</div>
            {{ profile.email }}
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-md q-gutter-sm text-center">
        <q-btn
          class="full-width"
          label="Update"
          color="light-blue-8"
          @click="prompt = true"
        />
        <q-btn class="full-width" label="Logout" color="red" @click="logout" />

        <q-dialog v-model="prompt" persistent>
          <q-card style="width: 350px">
            <q-card-section>
              <div class="text-h6">Update Profile</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-list :class="errorMessage.state" :hidden="hidden">
                <q-item>
                  <q-btn
                    size="sm"
                    color="transparent"
                    dense
                    icon="close"
                    @click="closeErrorPart()"
                  ></q-btn>
                </q-item>
                <q-separator inset dark />

                <q-item v-for="item in errorMessage.error" :key="item">
                  <q-item-section>
                    {{ item[0] }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model:model-value="profile.username"
                @keyup.enter="prompt = false"
                label="Your User Name"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model:model-value="profile.email"
                @keyup.enter="prompt = false"
                label="Your E-Mail"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                @keyup.enter="prompt = false"
                label="Your Password"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-file filled bottom-slots v-model="model" label="Label" counter>
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="model = null"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:hint> File Size </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Submit" @click="update()"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { accessMenu } from 'src/components/dashboard/ts/menuListComponent';
import { profile } from 'src/components/dashboard/ts/profileComponent';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { User } from 'src/models/user';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const hidden = ref(true);
    const dangerErrorState = 'bg-red q-pa-sm text-white';
    const successErrorState = 'bg-green q-pa-sm text-white';
    const errorMessage = ref({
      error: [],
      state: '',
    });

    return {
      accessMenu,
      profile,
      prompt: ref(false),
      model: ref(null),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      logout() {
        authStore.logout();
        router.replace({ name: 'login' });
      },
      hidden,
      errorMessage,
      closeErrorPart() {
        hidden.value = !hidden.value;
      },
      update() {
        User.updateProfile(
          profile.value.id,
          profile.value.username,
          profile.value.email,
          profile.value.password,
          profile.value.newAvatar,
        )
        .then(
          (response) => {
            if(response.status == 200){
              if(response.data.errors) {
                errorMessage.value.error = response.data.errors;
                errorMessage.value.state = successErrorState;
                hidden.value = false;
              }
            }
          },
          (reject) => {
            if(reject.response.status != 200){
              if(reject.response.data.errors) {
                errorMessage.value.error = reject.response.data.errors;
                errorMessage.value.state = dangerErrorState;
                hidden.value = false;
              }
            }
          }
        )
      }
    };
  },
};
</script>
<style>
.q-layout {
  background-image: url(../../image/loginWallpaper.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.q-header {
  background-image: linear-gradient(
    to right,
    rgb(5, 77, 139),
    rgb(2, 136, 209),
    rgb(245, 246, 240),
    rgb(30, 29, 71),
    rgb(0, 0, 28),
    rgb(30, 29, 71),
    rgb(245, 246, 240),
    rgb(2, 136, 209),
    rgb(5, 77, 139)
  );
}
.avatarBox {
  background-image: radial-gradient(
    rgb(245, 246, 240),
    rgb(2, 136, 209),
    rgb(5, 77, 139)
  );
  width: 100%;
  height: 300px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.9);
}
</style>
