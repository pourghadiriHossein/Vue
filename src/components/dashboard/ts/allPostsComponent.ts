import { Post } from "src/models/post";
import { ref } from "vue";

const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'User Name', field: 'user', sortable: true,format: (val:string) => `${val.name}`, },
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
    Post.allPostsForAdmin(1)
    .then(
      (response) => {
        rows.value = response.data.posts;
        pagination.value.page = response.data.meta?.pagination?.posts.current_page ?? 1;
        pagination.value.rowsNumber = response.data.meta?.pagination?.posts.total ?? 1;
      }
      )
    }
    else{
    Post.allPostsForAdmin(data.pagination.page)
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
