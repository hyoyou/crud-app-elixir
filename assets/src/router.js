import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AchievedGoals from './components/AchievedGoals.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/achieved',
      name: 'AchievedGoals',
      component: AchievedGoals
    }
  ]
})
