import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shop from "./shop"
import dl from "@/views/register/register"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dl',
      name: 'dl',
      component: dl
    },
    ...shop
  ]
})
