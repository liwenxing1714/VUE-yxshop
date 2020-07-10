import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shop from "./shop"
import dl from "@/views/register/register"
import homecont  from  "@/views/home/home";
import fl  from  "@/views/home/option1";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'homecont',
      component: homecont,
    },
    {
      path: '/fl',
      name: 'fl',
      component:fl,
    },
    {
      path: '/dl',
      name: 'dl',
      component: dl
    },
    ...shop
  ]
})
