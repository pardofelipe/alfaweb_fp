import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase.js'
import {collection, getDocs} from 'firebase/firestore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    courses:[],
    currentUser:"",
  },
  getters:{
    countFinishedCourse(state){
      return state.courses.reduce((total, course)=>{
        if (course.finished){
          return total=total+1
        }
        else{
          return total
        }
      },0)
    },
    countNotFinishedCourse(state, getters){
      return state.courses.length - getters.countFinishedCourse     
    }
  },
  mutations: {
    ADD_COURSE(state,course){
      state.courses.push({
        id: course.id,
        topic: course.data().topic,
        quota: course.data().quota,
        enrolled: course.data().enrolled,
        duration: course.data().duration,
        cost: course.data().cost,
        finished: course.data().finished,
        date: course.data().date,
        image: course.data().image,
        detail: course.data().detail
      })
    },
    RESET_COURSES(state){
      state.courses=[]
    },
    SET_USER(state, email){
      state.currentUser=email
    },
  },
  actions: {
    async fetchCourses({commit}){
      let querySnapShot = await getDocs(collection(db, 'courses'))
      commit('RESET_COURSES')
      querySnapShot.forEach((doc)=>{
        // console.log(doc)
        //  console.log(doc.id, '=>', doc.data())
        commit('ADD_COURSE',doc)
      })
    },
    set_user({commit},email){
      commit ('SET_USER', email)
    },
  },
  modules: {
  }
})


export default store