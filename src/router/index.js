import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import CursosView from '@/views/CursosView.vue'
import AdminView from '@/views/AdminView.vue'
import EditView from '@/views/EditView.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta:{privado:true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta:{privado:true}
  },
  {
    path:'/cursos',
    name:'Cursos',
    component:CursosView,
    meta:{privado:true}
  },
  {
    path:'/admin',
    name:'Admin',
    component:AdminView,
    meta:{privado:true}
  },
  {
    path:'/edit/:id',
    name:'Edit',
    component:EditView,
    meta:{privado:true},
    props:true
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/signup',
    name:'SignUp',
    component:SignUp
  },
  {
    path:"*",
    component:NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Guard
import { getAuth } from "firebase/auth";
router.beforeEach((to,from,next)=>{
  const auth = getAuth()
  console.log(auth)
  let user = auth.currentUser
  console.log(user)
  let private_rute = to.meta.privado
  if(private_rute && !user){
      next('/login')
    }
    else if(private_rute==undefined && user){
      next('/')
    }
    else{
      next()
    }
})

export default router