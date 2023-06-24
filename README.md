# Develop Client Side, Create Sample My Posts Part

## in components/dashboard/ts folder, Create myPostsComponent.ts File
```bash
const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true,format: (val:string) => `${val.slice(0,40)} ...`, },
]

const rows = [
  {
    id: 1,
    img : 'src/image/mountains.jpg',
    title : 'Best View',
    username: 'Hossein Pourghadiri',
    description : 'Lorem ipsum dolor sit amet, nam ne liber propriae, vel no vidit nullam volutpat. Ut harum inciderint usu, vivendum invenire est ut. In vix nobis legendos deterruisset. Quas dignissim cum ad. Sea quaestio assentior ut, ad eum idque regione salutatus. Inani splendide scripserit et nec. Et has aperiam civibus.',
  },
  {
    id: 2,
    img : 'src/image/mountains.jpg',
    title : 'Best View',
    username: 'Hossein Pourghadiri',
    description : 'Lorem ipsum dolor sit amet, nam ne liber propriae, vel no vidit nullam volutpat. Ut harum inciderint usu, vivendum invenire est ut. In vix nobis legendos deterruisset. Quas dignissim cum ad. Sea quaestio assentior ut, ad eum idque regione salutatus. Inani splendide scripserit et nec. Et has aperiam civibus.',
  },
  {
    id: 3,
    img : 'src/image/mountains.jpg',
    title : 'Best View',
    username: 'Hossein Pourghadiri',
    description : 'Lorem ipsum dolor sit amet, nam ne liber propriae, vel no vidit nullam volutpat. Ut harum inciderint usu, vivendum invenire est ut. In vix nobis legendos deterruisset. Quas dignissim cum ad. Sea quaestio assentior ut, ad eum idque regione salutatus. Inani splendide scripserit et nec. Et has aperiam civibus.',
  },
];

export {columns, rows}
```
## in components/dashboard/vue folder
- ### Create CreatePost.vue File
```bash
<script lang="ts" setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    img: {
      default: <any> null
    },
    title: {
      default: ''
    },
    description: {
      default: ''
    },
  });

  const model = ref(null);

  const createPostParameter = ref({
    title: '',
    description: '',
    image: undefined,
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
        <div class="text-h6">Create New Post</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model:model-value="createPostParameter.title" label="Enter Your Title"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
          <q-input type="textarea" dense v-model:model-value="createPostParameter.description" label="Enter Your Description"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model:model-value="createPostParameter.image" label="Post Image" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="createPostParameter.image = null" class="cursor-pointer" />
          </template>
          <template v-slot:hint>
            File Size
          </template>
        </q-file>
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
- ### Create DeletePost.vue File
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
    img: {
      default: 'No Image'
    },
    title: {
      default: 'Title'
    },
    username: {
      default: 'name'
    },
    description: {
      default: 'No Description'
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
    <q-card class="my-card" style="min-width: 350px;">
      <q-img :src="props.img" fit="cover"/>
      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ props.title }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ props.username }}
        </div>
        <div class="text-caption text-grey">
          {{ props.description }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="light-blue-8" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="red" icon-right="delete" label="Remove" @click="accepted"/>
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
- ### Create UpdatePost.vue File
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
    title: {
      default: 'Update'
    },
    description: {
      default: 'No Description'
    },
  });

  const updatePostParameter = ref({
    title: '',
    description: '',
    image: undefined,
  })

  watch(props, () => {
    updatePostParameter.value = {
      title: props.title,
      description: props.description,
      image: updatePostParameter.value.image,
    }
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
        <div class="text-h6">Update Post {{ props.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model:model-value="updatePostParameter.title" label="Enter Your Title"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
          <q-input type="textarea" dense v-model:model-value="updatePostParameter.description" label="Enter Your Description"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model:model-value="updatePostParameter.image" label="Post Image" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="updatePostParameter.image = null" class="cursor-pointer" />
          </template>
          <template v-slot:hint>
            File Size
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="light-blue-8" icon-right="update" label="Update" @click="accepted"/>
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
## Update MyPostsPage.vue File
```bash
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
```

