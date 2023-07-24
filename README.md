# Develop Client Side, Create Register and Update Profile Mechanism

## Create models Folder

- ### Create types.ts File

```bash
export class FetchResponse<model> {
  meta?: {
    pagination?: {
      [key: string]: {
        per_page?: number;
        total?: number;
        first_item?: number;
        last_item?: number;
        last_page?: number;
        current_page?: number;
      };
    };
  };
  [key: string]: Array<model>;
}
```

- ### Create post.ts File

```bash
export class Post {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  upVoteCount: number;
  latitude: number;
  longitude: number;

  constructor(
    id: number,
    name?: string,
    title?: string,
    description?: string,
    image?: string,
    upVoteCount?: number,
    latitude?: number,
    longitude?: number
  ) {
    this.id = id;
    this.name = name ?? '';
    this.title = title ?? '';
    this.description = description ?? '';
    this.image = image ?? '';
    this.upVoteCount = upVoteCount ?? 0;
    this.latitude = latitude ?? 37.27;
    this.longitude = longitude ?? 49.53;
  }
}
```

- ### Create user.ts File

```bash
export class User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  password: string;

  constructor(
    id: number,
    username?: string,
    email?: string,
    avatar?: string,
    password?: string
  ) {
    this.id = id;
    this.username = username ?? '';
    this.email = email ?? '';
    this.avatar = avatar ?? '';
    this.password = password ?? '';
  }
}
```

```bash
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';
```

```bash
static async register(
  username: string,
  email: string,
  password: string,
  avatar: File
) {
  const data = new FormData();
  data.append('name', username);
  data.append('email', email);
  data.append('password', password);
  data.append('avatar', avatar);
  const response = await api.post<AxiosResponse>('api/register', data);
  if (response.status == 200) {
    return response;
  }
  throw Error('Register Failed');
}
```

```bash
static async profile() {
  const response = await api.get('api/user/profile', {});
  if (response.status == 200) {
    return response;
  }
  throw Error('Profile failed');
}
```

```bash
static async updateProfile(
  id: number,
  username: string,
  email: string,
  password: string,
  avatar: File
) {
  const data = new FormData();
  data.append('name', username);
  data.append('email', email);
  data.append('password', password);
  data.append('avatar', avatar);
  const response = await api.post<AxiosResponse>(
    `api/update-my-profile/${id}`,
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Update Failed');
}
```
## In components/dashboard/ts Folder, Update profileComponent.ts File
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
})
```
## In pages/login Folder, Update RegisterPage.vue File
- ### In script, import User model
```bash
import { User } from 'src/models/user';
```
- ### In script, write the valdiation script before return
```bash
const hidden = ref(true);
const errorMessage = ref({
  error: [],
  state: '',
});
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
```
- ### In script, write the valdiation script and register function in return
```bash
hidden,
errorMessage,
dangerErrorState,
successErrorState,
closeErrorPart() {
  hidden.value = true;
},
register() {
  User.register(
    newUser.value.name,
    newUser.value.email,
    newUser.value.password,
    newUser.value.avatar
  ).then(
    (response) => {
      if (response.status == 200) {
        if (response.data.errors) {
          errorMessage.value.error = response.data.errors;
          errorMessage.value.state = successErrorState;
          hidden.value = false;
          setTimeout(() => {
            router.replace({ name: 'login' });
          }, 2000);
        }
      }
    },
    (reject) => {
      if (reject.response.status != 200) {
        if (reject.response.data.errors) {
          errorMessage.value.error = reject.response.data.errors;
          errorMessage.value.state = dangerErrorState;
          hidden.value = false;
        }
      }
    }
  );
},
```
- ### In template, write the valdiation template for error show
```bash
<q-card-section class="q-pt-none">
  <q-list :class="errorMessage.state" :hidden="hidden">
    <q-item>
      <q-btn
        size="sm"
        color="trasparent"
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
```
- ### In template, write click event on register btn
```bash
<q-btn @click="register" unelevated color="light-blue-8" size="lg" class="full-width" label="Register"/>
```

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
})
```
## In layouts/dashboard, Update DashboardLayout.vue File
- ### In script, import User model
```bash
import { User } from 'src/models/user';
```

- ### In script, write the valdiation script before return
```bash
const hidden = ref(true);
const errorMessage = ref({
  error: [],
  state: '',
});
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
```
- ### In script, write the valdiation script and update profile function in return
```bash
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
```
- ### In template, write the valdiation template for error show in update profile dialog
```bash
<q-card-section class="q-pt-none">
  <q-list :class="errorMessage.state" :hidden="hidden">
    <q-item>
      <q-btn
        size="sm"
        color="trasparent"
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
```
- ### In template, write click event on submit btn in dialog
```bash
<q-btn flat label="Submit" @click="update()"/>
```
