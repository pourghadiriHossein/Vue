# Develop Client Side, Active Security for Dashboard Layout

## In components/dashboard/ts, Update profileComponent.ts File
```bash
import { ref } from 'vue';
import { User } from 'src/models/user'

const serverRoute = 'http://127.0.0.1:8000/';

const userData =  () => {
  User.profile()
  .then(
    (value) => {
      profile.value.id = value.data.user.id;
      profile.value.username = value.data.user.name;
      profile.value.email = value.data.user.email;
      if(value.data.user.media[0]?.url){
        profile.value.avatar = serverRoute + value.data.user.media[0]?.url;
      }
      profile.value.role = value.data.user.roles[0].name
    }
  )
}
userData();

export const profile = ref({
  id: 0,
  username: '',
  email: '',
  avatar: 'src/image/avatar.png',
  newAvatar: undefined,
  password: '',
  role: '',
})
```

## In Layouts/dashboard, Update DashboardLayout.vue File
- ### in template, Update q-list tag in left drawer
```bash
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
```

