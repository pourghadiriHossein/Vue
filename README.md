# Develop Client Side, Create and Update and Delete User for Admin

## In models, Update user.ts File

- ### import FetchResponse to types model

```bash
import { FetchResponse } from 'src/models/types';
```

- ### write all user function for admin

```bash
static async allUserForAdmin(page: number) {
  const response = await api.get<FetchResponse<User>>(
    `api/all-users?page=${page}`
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Get All User For Admin Failed');
}
```

- ### write create user function for admin

```bash
static async createUserByAdmin(
  username: string,
  email: string,
  password: string,
  avatar: File,
  role: string
) {
  const data = new FormData();
  data.append('name', username);
  data.append('email', email);
  data.append('password', password);
  data.append('avatar', avatar);
  data.append('role', role);
  const response = await api.post<AxiosResponse>(
    'api/create-user-by-admin',
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Created Failed');
}
```

- ### write update user function for admin

```bash
static async updateUserByAdmin(
  id: number,
  username: string,
  email: string,
  password: string,
  avatar: File,
  role: string
) {
  const data = new FormData();
  data.append('name', username);
  data.append('email', email);
  data.append('password', password);
  data.append('avatar', avatar);
  data.append('role', role);
  const response = await api.post<AxiosResponse>(
    `api/update-user-by-admin/${id}`,
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Created Failed');
}
```

- ### write delete user function for admin

```bash
static async deleteUserByAdmin(id: number) {
  const response = await api.get(`api/delete-user-by-admin/${id}`);
  if (response.status == 200) {
    return response;
  }
  throw Error('Delete User failed');
}
```

## In components/dashboard/ts folder

- ### Update allUsersComponent.ts File

```bash
import { User } from 'src/models/user';
import { ref } from 'vue';

const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'User Name', field: 'name', sortable: true },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
]

const rows = ref();

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 100
})
const onRequest = (data: any) => {

  if(!data){
    User.allUserForAdmin(1)
    .then(
      (response) => {
        rows.value = response.data.users;
        pagination.value.page = response.data.meta?.pagination?.users.current_page ?? 1;
        pagination.value.rowsNumber = response.data.meta?.pagination?.users.total ?? 1;
      }
      )
    }
    else{
    User.allUserForAdmin(data.pagination.page)
    .then(
      (response) => {
        rows.value = response.data.users;
        pagination.value.page = response.data.meta?.pagination?.users.current_page ?? 1;
        pagination.value.rowsNumber = response.data.meta?.pagination?.users.total ?? 1;
      }
    )
  }
}
onRequest(null);
export {columns, rows, pagination, onRequest}
```

## In components/dashboard/vue folder, Update AdminCreateUser.vue File

- ### import user model

```bash
import { User } from 'src/models/user';
```

- ### add refresh prop to component props

```bash
refresh: {},
```

- ### write validation script

```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: '',
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
};
```

- ### Update accepted function

```bash
const accepted = () => {
  User.createUserByAdmin(
    createUserParameter.value.username,
    createUserParameter.value.email,
    createUserParameter.value.password,
    createUserParameter.value.avatar,
    choice.value
  ).then(
    (response) => {
      if (response.status == 200) {
        if (response.data.errors) {
          errorMessage.value.error = response.data.errors;
          errorMessage.value.state = successErrorState;
          hidden.value = false;
          props.refresh();
          setTimeout(() => {
            emit.call(this, 'update:model-value', false);
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
};
```

- ### write validation tags in template

```bash
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
```

## In components/dashboard/vue folder, Update AdminUpdateUser.vue File

- ### import user model

```bash
import { User } from 'src/models/user';
```

- ### add refresh prop to component props

```bash
refresh: {},
```

- ### write validation script

```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: '',
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
};
```

- ### Update accepted function

```bash
const accepted = () => {
  User.updateUserByAdmin(
    props.id,
    updateUserParameter.value.username,
    updateUserParameter.value.email,
    updateUserParameter.value.password,
    updateUserParameter.value.avatar,
    choice.value
  ).then(
    (response) => {
      if (response.status == 200) {
        if (response.data.errors) {
          errorMessage.value.error = response.data.errors;
          errorMessage.value.state = successErrorState;
          hidden.value = false;
          props.refresh();
          setTimeout(() => {
            emit.call(this, 'update:model-value', false);
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
};
```

- ### write validation tags in template

```bash
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
```

## In components/dashboard/vue folder, Update AdminDeleteUser.vue File

- ### import user model

```bash
import { defineProps, defineEmits, ref } from 'vue';
import { User } from 'src/models/user';
```

- ### add refresh prop to component props

```bash
refresh: {},
```

- ### write validation script

```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: '',
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
};
```

- ### Update accepted function

```bash
const accepted = () => {
  User.deleteUserByAdmin(props.id).then(
    (response) => {
      if (response.status == 200) {
        if (response.data.errors) {
          errorMessage.value.error = response.data.errors;
          errorMessage.value.state = successErrorState;
          hidden.value = false;
          props.refresh();
          setTimeout(() => {
            emit.call(this, 'update:model-value', false);
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
};
```

- ### write validation tags in template

```bash
<q-card-section>
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
```

## In pages/dashboard folder, Update AllUsersPage.vue File

- ### Update import part in script

```bash
import {columns, rows, pagination, onRequest} from 'src/components/dashboard/ts/allUsersComponent';
import AdminCreateUser from 'src/components/dashboard/vue/AdminCreateUser.vue';
import AdminUpdateUser from 'src/components/dashboard/vue/AdminUpdateUser.vue';
import AdminDeleteUser from 'src/components/dashboard/vue/AdminDeleteUser.vue';
```

- ### Update updateUserFunction in script

```bash
const updateUserFunction = (row: any) => {
  updateUserParameter.value.id = row.id;
  updateUserParameter.value.username = row.name;
  updateUserParameter.value.email = row.email;
  updateUserParameter.value.role = row.roles[0].name;
  updateUserDialog.value = true;
};
```

- ### Update q-table tag in template

```bash
<q-table
  :grid="$q.screen.xs"
  title="َAll Users"
  :rows="rows"
  :columns="columns"
  row-key="name"
  :filter="filter"
  :rows-per-page-options="[0]"
  v-model:pagination="pagination"
  @request="onRequest"
>
```

- ### Update admin-create-user component in template

```bash
<admin-create-user
v-model:model-value="createUserDialog"
:id="createUserParameter.id"
:username="createUserParameter.username"
:email="createUserParameter.email"
:refresh="onRequest"
></admin-create-user>
```

- ### Update admin-update-user component in template

```bash
<admin-update-user
  v-model:model-value="updateUserDialog"
  :id="updateUserParameter.id"
  :username="updateUserParameter.username"
  :email="updateUserParameter.email"
  :role="updateUserParameter.role"
  :refresh="onRequest"
></admin-update-user>
```

- ### Update admin-delete-user component in template

```bash
<admin-delete-user
  v-model:model-value="deleteUserDialog"
  :id="deleteUserParameter.id"
  :username="deleteUserParameter.username"
  :email="deleteUserParameter.email"
  :refresh="onRequest"
></admin-delete-user>
```
