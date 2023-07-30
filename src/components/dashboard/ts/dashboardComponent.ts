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
