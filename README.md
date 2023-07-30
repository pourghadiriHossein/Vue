# Develop Client Side, Complete dashboard Part

## In models, Update post.ts File
- ### Write all Posts in dashboard function for Dashboard index
```bash
static async allPostInDashboard() {
  const response = await api.get<FetchResponse<Post>>(
    'api/all-posts-for-dashboard'
  );
  if (response.status == 200) {
    return response;
  }
  throw Error('Deleted Failed');
}
```
- ### Write like post function for Dashboard index
```bash
static async likePost(id: number) {
  const response = await api.get<FetchResponse<Post>>(`api/posts/${id}/like`);
  if (response.status == 200) {
    return response;
  }
  throw Error('Deleted Failed');
}
```
## In components/dashboard/ts folder, Update dashboardComponent.ts File
```bash
import { Post } from 'src/models/post';
import { ref } from 'vue';
const serverRoute = 'http://127.0.0.1:8000/';
const posts: any = ref([]);

const refresh = () => {
  if (posts.value != null) {
    posts.value = [];
  }
  Post.allPostInDashboard().then((response) => {
    response.data.forEach((post) => {
      posts.value.push({
        id: post.id,
        img: serverRoute + post.media[0].url,
        latitude: post.latitude,
        longitude: post.longitude,
        title: post.title,
        username: post.user.name,
        description: post.description,
        upVoteCount: post.up_vote_count,
      });
    });
  });
};
refresh();
export { posts, refresh };
```

## In pages/dashboard, Update DashboardPage.vue File
- ### In script, Update import part
```bash
import {posts , refresh} from 'src/components/dashboard/ts/dashboardComponent'
import { Post } from 'src/models/post';
```
- ### In script, Write like function
```bash
const like = (id: number) => {
  Post.likePost(id)
  .then(
    (response)=>{
      if (response.status == 200) {
        refresh();
      }
    }
  )
}
```
- ### In template, Update like q-btn
```bash
<q-btn color="light-blue-8" icon-right="favorite" :label="`Like (${post.upVoteCount})`" @click="like(post.id)"/>
```
- ### In template, add state prob map view component tag
```bash
:state="'view'"
```



