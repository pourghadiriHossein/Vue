const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'username', align: 'center', label: 'User Name', field: 'username', sortable: true },
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
    latitude: 37.27,
    longitude: 49.53,
  },
  {
    id: 2,
    img : 'src/image/mountains.jpg',
    title : 'Best View',
    username: 'Hossein Pourghadiri',
    description : 'Lorem ipsum dolor sit amet, nam ne liber propriae, vel no vidit nullam volutpat. Ut harum inciderint usu, vivendum invenire est ut. In vix nobis legendos deterruisset. Quas dignissim cum ad. Sea quaestio assentior ut, ad eum idque regione salutatus. Inani splendide scripserit et nec. Et has aperiam civibus.',
    latitude: 37.25,
    longitude: 49.24,
  },
  {
    id: 3,
    img : 'src/image/mountains.jpg',
    title : 'Best View',
    username: 'Hossein Pourghadiri',
    description : 'Lorem ipsum dolor sit amet, nam ne liber propriae, vel no vidit nullam volutpat. Ut harum inciderint usu, vivendum invenire est ut. In vix nobis legendos deterruisset. Quas dignissim cum ad. Sea quaestio assentior ut, ad eum idque regione salutatus. Inani splendide scripserit et nec. Et has aperiam civibus.',
    latitude: 37.40,
    longitude: 49.30,
  },
];


export {columns, rows}
