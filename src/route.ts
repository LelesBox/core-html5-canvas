import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home.vue'
import { Chapters } from './chapters'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home }
]

export default new VueRouter({
  routes: routes.concat(Chapters.map(c => ({
    path: c.path, component: c.component
  }))),
  mode: 'history'
})