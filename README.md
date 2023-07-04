# Develop Client Side, Create Sample All Users Part

## In components/dashboard/ts , Create allUsersComponent.ts File
```bash
const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'User Name', field: 'name', sortable: true },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
]

const rows: any = [
  {
    id: 1,
    name: 'Hossein Pourghadiri',
    email: "hossein.654321@yahoo.com",
    role: 'admin',
  },
  {
    id: 2,
    name: 'Ali Tabrizi',
    email: "alitabrizi@live.com",
    role: 'admin',
  },
  {
    id: 3,
    name: 'Vahid Kamli',
    email: "vahidkamali@yahoo.com",
    role: 'admin',
  },
  {
    id: 4,
    name: 'Behrooz Asemani',
    email: "behroozasemani@gmail.com",
    role: 'admin',
  },
  {
    id: 5,
    name: 'Akbar Rahmati',
    email: "akbarrahmati@yahoo.com",
    role: 'admin',
  },
  {
    id: 6,
    name: 'Kabir Kermuni',
    email: "kabirkermani@gmail.com",
    role: 'user',
  },
  {
    id: 7,
    name: 'Nosrat Biyabani',
    email: "nosratbiyabani@live.com",
    role: 'user',
  },
  {
    id: 8,
    name: 'Nastaran Azadeh',
    email: "nastaranazadeh@yahoo.com",
    role: 'user',
  },
  {
    id: 9,
    name: 'Mastoreh Salimi',
    email: "mastorehsalimi@gmail.com",
    role: 'user',
  },
  {
    id: 10,
    name: 'Roksana Rashidi',
    email: "roksanarashidi@live.com",
    role: 'user',
  },
]

export {columns, rows}
```
## In components/dashboard/vue , Create AdminCreateUser.vue File
```bash
<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    id: {
      default: 0
    },
    username: {
      default: ''
    },
    email: {
      default: ''
    },
    password: {
      default: ''
    },
    options: {
      default: ['admin', 'user']
    },
  });
  const choice = ref(null);

  const createUserParameter = ref({
    username: props.username,
    email: props.username,
    password: props.username,
    avatar: undefined,
  })
  const emit = defineEmits(['update:model-value']);

  const close = () => {
    emit.call(this, 'update:model-value', false);
  };
  const accepted = () => {
    emit.call(this, 'update:model-value', false);
  };
</script>

<template>

  <q-dialog :model-value="modelValue" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New User</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense @keyup.enter="modelValue" v-model:model-value="createUserParameter.username" label="Enter Your User Name"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense @keyup.enter="modelValue" v-model:model-value="createUserParameter.email" label="Enter Your E-Mail"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input type="password" dense @keyup.enter="modelValue" v-model:model-value="createUserParameter.password" label="Enter Your Password"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model:model-value="createUserParameter.avatar" label="Avatar" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="createUserParameter.avatar = null" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            File Size
          </template>
        </q-file>
      </q-card-section>
      <q-card-section>
        <q-select v-model="choice" :options="options" label="Role" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="light-blue-8" icon-right="create" label="Create" @click="accepted"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirm-dialog {
  width: 95%;
  max-width: 400px;
}
</style>
```

## In components/dashboard/vue , Create AdminUpdateUser.vue File
```bash
<script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    id: {
      default: 0
    },
    username: {
      default: ''
    },
    email: {
      default: ''
    },
    password: {
      default: ''
    },
    role: {
      default: 'user'
    },
    options: {
      default: ['admin', 'user']
    },
  });
  const choice = ref();

  const updateUserParameter = ref({
    username: '',
    email: '',
    password: '',
    avatar: undefined,
  })

  watch(props, () => {
      updateUserParameter.value = {
      username: props.username,
      email: props.email,
      password: '',
      avatar: undefined,
    }
    choice.value = props.role;
  })

  const emit = defineEmits(['update:model-value']);

  const close = () => {
    emit.call(this, 'update:model-value', false);
  };
  const accepted = () => {
    emit.call(this, 'update:model-value', false);
  };
</script>

<template>

  <q-dialog :model-value="modelValue" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update {{ username }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense @keyup.enter="modelValue" v-model:model-value="updateUserParameter.username" label="Enter Your User Name"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense @keyup.enter="modelValue" v-model:model-value="updateUserParameter.email" label="Enter Your E-Mail"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input type="password" dense @keyup.enter="modelValue" v-model:model-value="updateUserParameter.password" label="Enter Your Password"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model:model-value="updateUserParameter.avatar" label="Avatar" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="updateUserParameter.avatar = null" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            File Size
          </template>
        </q-file>
      </q-card-section>
      <q-card-section>
        <q-select v-model="choice" :options="options" label="Role" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="light-blue-8" icon-right="create" label="Create" @click="accepted"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirm-dialog {
  width: 95%;
  max-width: 400px;
}
</style>
```

## In components/dashboard/vue , Create AdminDeleteUser.vue File
```bash
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    id: {
      default: 0
    },
    username: {
      default: 'No username'
    },
    email: {
      default: 'No E-Mail'
    },
  });
  const emit = defineEmits(['update:model-value']);

  const close = () => {
    emit.call(this, 'update:model-value', false);
  };
  const accepted = () => {
    emit.call(this, 'update:model-value', false);
  };
</script>

<template>

  <q-dialog :model-value="modelValue" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white" />
        <span class="q-ml-sm">Are You Sure, Want You To Delete {{ username }}?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="light-blue-8" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="red" icon-right="delete" label="Delete" @click="accepted"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirm-dialog {
  width: 95%;
  max-width: 400px;
}
</style>
```

## In pages/dashboard , Update AllUsersPage.vue File
```bash
<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      title="َAll Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Create New User" color="light-blue-8" class="q-ml-md" @click="createUserFunction()"/>
        <admin-create-user
        v-model:model-value="createUserDialog"
        :id="createUserParameter.id"
        :username="createUserParameter.username"
        :email="createUserParameter.email"
        ></admin-create-user>
      </template>
      <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              >
              {{ col.label }}
            </q-th>
            <q-th auto-width>
              Tools
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn class="q-ma-sm" size="md" color="warning" dense icon="update" @click="updateUserFunction(props.row)"/>
              <q-btn class="q-ma-sm" size="md" color="red" dense icon="delete" @click="deleteUserFunction(props.row)"/>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>
  <admin-update-user
    v-model:model-value="updateUserDialog"
    :id="updateUserParameter.id"
    :username="updateUserParameter.username"
    :email="updateUserParameter.email"
    :role="updateUserParameter.role"
    ></admin-update-user>
    <admin-delete-user
    v-model:model-value="deleteUserDialog"
    :id="deleteUserParameter.id"
    :username="deleteUserParameter.username"
    :email="deleteUserParameter.email"
    ></admin-delete-user>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {columns, rows} from 'src/components/dashboard/ts/allUsersComponent';
  import AdminCreateUser from 'src/components/dashboard/vue/AdminCreateUser.vue';
  import AdminUpdateUser from 'src/components/dashboard/vue/AdminUpdateUser.vue';
  import AdminDeleteUser from 'src/components/dashboard/vue/AdminDeleteUser.vue';

  const filter = ref('');
  const createUserParameter = ref({
    id: <number> 0,
    username: <string> '',
    email: <string> '',
  });
  const updateUserParameter = ref({
    id: <number> 0,
    username: <string> '',
    email: <string> '',
    role: <string> '',
  });
  const deleteUserParameter = ref({
    id: <number> 0,
    username: <string> '',
    email: <string> '',
  });
  const createUserDialog = ref(false);
  const createUserFunction = () => {
    createUserParameter.value.id = 0;
    createUserParameter.value.username = '';
    createUserParameter.value.email = '';
    createUserDialog.value = true;
  };
  const updateUserDialog = ref(false);
  const updateUserFunction = (row: any) => {
    updateUserParameter.value.id = row.id;
    updateUserParameter.value.username = row.name;
    updateUserParameter.value.email = row.email;
    updateUserParameter.value.role = row.role;
    updateUserDialog.value = true;
  };
  const deleteUserDialog = ref(false);
  const deleteUserFunction = (row: any) => {
    deleteUserParameter.value.id = row.id;
    deleteUserParameter.value.username = row.name;
    deleteUserParameter.value.email = row.email;
    deleteUserDialog.value = true;
  };
</script>
```
