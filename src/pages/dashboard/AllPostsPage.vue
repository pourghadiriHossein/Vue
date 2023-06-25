<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      title="My Posts"
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
              <q-btn class="q-ma-sm" size="md" color="warning" dense icon="update" @click="updatePostFunction(props.row)"/>
              <q-btn class="q-ma-sm" size="md" color="red" dense icon="delete" @click="deletePostFunction(props.row)"/>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </div>
  <admin-update-post
  v-model:model-value="updatePostDialog"
  :id="updatePostParameter.id"
  :title="updatePostParameter.title"
  :description="updatePostParameter.description"
  ></admin-update-post>
  <admin-delete-post
  v-model:model-value="deletePostDialog"
  :id="deletePostParameter.id"
  :img="deletePostParameter.img"
  :title="deletePostParameter.title"
  :username="deletePostParameter.username"
  :description="deletePostParameter.description"
  ></admin-delete-post>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {columns, rows} from 'src/components/dashboard/ts/allPostsComponent';
  import AdminUpdatePost from 'src/components/dashboard/vue/AdminUpdatePost.vue';
  import AdminDeletePost from 'src/components/dashboard/vue/AdminDeletePost.vue';

  const filter = ref('');
  const updatePostParameter = ref({
    id: <number>0,
    title: <string> '',
    description: <string> ''
  });
  const deletePostParameter = ref({
    id: <number>0,
    img: <string> '',
    title: <string> '',
    username: <string> '',
    description: <string> '',
  });
  const updatePostDialog = ref(false);
  const updatePostFunction = (row: any) => {
    updatePostParameter.value.id = row.id;
    updatePostParameter.value.title = row.title;
    updatePostParameter.value.description = row.description;
    updatePostDialog.value = true;
  };
  const deletePostDialog = ref(false);
  const deletePostFunction = (row: any) => {
    deletePostParameter.value.id = row.id;
    deletePostParameter.value.img = row.img;
    deletePostParameter.value.title = row.title;
    deletePostParameter.value.username = row.username;
    deletePostParameter.value.description = row.description;
    deletePostDialog.value = true;
  };
</script>
