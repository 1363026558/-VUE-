import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/home/Home')
const Read = () => import('@/views/read/Read')
const Message = () => import('@/views/message/Message')
const Search = () => import('@/views/search/Search')
const SearchList = () => import('@/views/searchList/SearchList')
const PerRead = () => import('@/views/perread/PerRead')



Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/home', component: Home},
  { path: '/read', component: Read},
  { path: '/message', component: Message},
  { path: '/search', component: Search},
  { path: '/searchlist', component: SearchList},
  { path: '/perread', component: PerRead},
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
