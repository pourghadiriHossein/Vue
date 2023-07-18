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
