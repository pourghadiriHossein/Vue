# Develop Client Side, Create and Update and Delete for My Post

## In models, Update Post.ts File
- ### import part
```bash
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';
import { FetchResponse } from 'src/models/types';
```
- ### Write My Posts list function for User
```bash
static async myPosts(page: number) {
  const response = await api.get<FetchResponse<Post>>(
    `api/my-posts?page=${page}`
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('My Posts failed');
}
```
- ### Write Create Post function For User
```bash
static async createPost(
  title: string,
  description: string,
  image: File,
  latitude: number,
  longitude: number
) {
  const data = new FormData();
  data.append('title', title);
  data.append('description', description);
  data.append('image', image);
  data.append('latitude', latitude);
  data.append('longitude', longitude);
  const response = await api.post<AxiosResponse>(
    'api/create-post',
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Created Failed');
}
```
- ### Write Update Post function For User
```bash
static async updatePost(
  id: number,
  title: string,
  description: string,
  image: File,
  latitude: number,
  longitude: number
) {
  const data = new FormData();
  data.append('title', title);
  data.append('description', description);
  data.append('image', image);
  data.append('latitude', latitude);
  data.append('longitude', longitude);
  const response = await api.post<AxiosResponse>(
    `api/update-my-post/${id}`,
    data
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Updated Failed');
}
```
- ### Write Delete Post function For User
```bash
static async deletePost(id: number) {
  const response = await api.get<FetchResponse<Post>>(
    `api/delete-my-post/${id}`
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Deleted Failed');
}
```
## In components/dashboard/ts Folder, Update myPostsComponent.ts File
```bash
import { Post } from 'src/models/post';
import { ref } from "vue";

const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true,format: (val:string) => `${val.slice(0,40)} ...`, },
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
    Post.myPosts(1)
    .then(
      (response) => {
        rows.value = response.data.posts;
        pagination.value.page = response.data.meta?.pagination?.posts.current_page ?? 1;
        pagination.value.rowsNumber = response.data.meta?.pagination?.posts.total ?? 1;
      }
      )
    }
    else{
    Post.myPosts(data.pagination.page)
    .then(
      (response) => {
        rows.value = response.data.posts;
        pagination.value.page = response.data.meta?.pagination?.posts.current_page ?? 1;
        pagination.value.rowsNumber = response.data.meta?.pagination?.posts.total ?? 1;
      }
    )
  }
}
onRequest(null);

export {columns, rows, pagination, onRequest}
```
## In components/dashboard/vue Folder, Update CreatePost.vue File
- ### import part
```bash
import { Post } from 'src/models/post';
```
- ### add refresh prop to props
```bash
refresh: {}
```
- ### Write validation script
```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: ''
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
}
```
- ### Update accepted function
```bash
Post.createPost(
  createPostParameter.value.title,
  createPostParameter.value.description,
  createPostParameter.value.image,
  createPostParameter.value.latitude,
  createPostParameter.value.longitude,
)
  .then(
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
  )
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

## In components/dashboard/vue Folder, Update UpdatePost.vue File
- ### import part
```bash
import { Post } from 'src/models/post';
```
- ### add refresh prop to props
```bash
refresh: {}
```
- ### Write validation script
```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: ''
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
}
```
- ### Update accepted function
```bash
Post.updatePost(
  props.id,
  updatePostParameter.value.title,
  updatePostParameter.value.description,
  updatePostParameter.value.image,
  updatePostParameter.value.latitude,
  updatePostParameter.value.longitude,
)
  .then(
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
  )
```
- ### write validation tags in template
```bash
<q-card-section class="q-pt-none">
  <q-list :class="errorMessage.state" :hidden="hidden">
    <q-item>
      <q-btn size="sm" color="transparent" dense icon="close" @click="closeErrorPart()"></q-btn>
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

## In components/dashboard/vue Folder, Update DeletePost.vue File
- ### import part
```bash
import { Post } from 'src/models/post';
```
- ### add refresh prop to props
```bash
refresh: {}
```
- ### Write validation script
```bash
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: ''
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
}
```
- ### Update accepted function
```bash
Post.deletePost(props.id).then(
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
## In pages/dashboard folder, Update MyPostsPage.vue File
- ### In Script, Update import part
```bash
  import {columns, rows , pagination, onRequest} from 'src/components/dashboard/ts/myPostsComponent';
```
- ### In Script, Update deletePostFunction
```bash
    deletePostParameter.value.img = `http://127.0.0.1:8000/${row.media[0].url}`;
```
- ### In template, Update q-table
```bash
v-model:pagination="pagination"
@request="onRequest"
```
- ### In template, add refresh prop to create post component tag
```bash
:refresh="onRequest"
```
- ### In template, add refresh prop to update post component tag
```bash
:refresh="onRequest"
```
- ### In template, add refresh prop to delete post component tag
```bash
:refresh="onRequest"
```
