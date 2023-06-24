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
        <q-btn label="Create New Post" color="light-blue-8" class="q-ml-md" @click="createPostFunction()"/>
        <create-post
        v-model:model-value="createPostDialog"
        :img="createPostParameter.img"
        :title="createPostParameter.title"
        :description="createPostParameter.description"
        ></create-post>
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
  <update-post
  v-model:model-value="updatePostDialog"
  :id="updatePostParameter.id"
  :title="updatePostParameter.title"
  :description="updatePostParameter.description"
  ></update-post>
  <delete-post
  v-model:model-value="deletePostDialog"
  :id="deletePostParameter.id"
  :img="deletePostParameter.img"
  :title="deletePostParameter.title"
  :username="deletePostParameter.username"
  :description="deletePostParameter.description"
  ></delete-post>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {columns, rows} from 'src/components/dashboard/ts/myPostsComponent';
  import CreatePost from 'src/components/dashboard/vue/CreatePost.vue'
  import UpdatePost from 'src/components/dashboard/vue/UpdatePost.vue';
  import DeletePost from 'src/components/dashboard/vue/DeletePost.vue';

  const filter = ref('');
  const createPostParameter = ref({
    img: <string> '',
    title: <string> '',
    description: <string> ''
  });
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
  const createPostDialog = ref(false);
  const createPostFunction = () => {
    createPostParameter.value.img = '';
    createPostParameter.value.title = '';
    createPostParameter.value.description = '';
    createPostDialog.value = true;
  };
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
