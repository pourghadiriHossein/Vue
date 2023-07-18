const columns: any = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: 'User Name', field: 'name', sortable: true },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
]

const rows: any = [
  {
    id: 1,
    name: 'Hossein Pourghadiri',
    email: "hossein.654321@yahoo.com",
    role: 'admin',
  },
  {
    id: 2,
    name: 'Ali Tabrizi',
    email: "alitabrizi@live.com",
    role: 'admin',
  },
  {
    id: 3,
    name: 'Vahid Kamli',
    email: "vahidkamali@yahoo.com",
    role: 'admin',
  },
  {
    id: 4,
    name: 'Behrooz Asemani',
    email: "behroozasemani@gmail.com",
    role: 'admin',
  },
  {
    id: 5,
    name: 'Akbar Rahmati',
    email: "akbarrahmati@yahoo.com",
    role: 'admin',
  },
  {
    id: 6,
    name: 'Kabir Kermuni',
    email: "kabirkermani@gmail.com",
    role: 'user',
  },
  {
    id: 7,
    name: 'Nosrat Biyabani',
    email: "nosratbiyabani@live.com",
    role: 'user',
  },
  {
    id: 8,
    name: 'Nastaran Azadeh',
    email: "nastaranazadeh@yahoo.com",
    role: 'user',
  },
  {
    id: 9,
    name: 'Mastoreh Salimi',
    email: "mastorehsalimi@gmail.com",
    role: 'user',
  },
  {
    id: 10,
    name: 'Roksana Rashidi',
    email: "roksanarashidi@live.com",
    role: 'user',
  },
]

export {columns, rows}
