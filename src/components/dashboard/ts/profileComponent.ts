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
