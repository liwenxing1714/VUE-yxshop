import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shop from "./shop"
import dl from "@/views/register/register"
import homecont  from  "@/views/home/home";
import homecont2  from  "@/views/home/home2";
import user  from  "@/views/home/my";
import kanjia  from  "@/views/home/kanjia";
import landing  from  "@/views/landing/landing";
import all2  from  "@/views/categoryall/all2";
import list  from  "@/views/categoryall/list";
import seach from '@/views/seach/seach'
import special from '@/views/home/special'
import zhuanlan from '@/views/home/zhuanlan'
import shoplist from '@/views/shop/shoplist'
import order from '@/views/order';
import denglu from '@/views/denglu'
import zhifu from '@/views/payment'
import dingdan from '@/views/dingdan'
import address from '@/views/address/address'

// 解决重复触发一个路由路径时报错的问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homecont',
      component: homecont,
      redirect:'/home/home2'
    },
    {
      path: '/l',
      name: 'landing',
      component: landing, 
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: dingdan, 
    },
    {
      path: '/address',
      name: 'address',
      component: address, 
    },
    {
      path: '/zhifu',
      name: 'zhifu',
      component: zhifu, 
    },
    {
      path: '/denglu',
      name: 'denglu',
      component: denglu, 
    },
    {
      path: '/order',
      name: 'order',
      component: order, 
    },
    {
      path: 'list/:id',
      name: 'list',
      component: list, 
    },
    {
      path: '/shoplist/:id',
      name: 'shoplist',
      component: shoplist, 
    },
    {
      path: '/home',
      name: 'homecont',
      component: homecont,
      children:[
        
        {
          path: 'special',
          name: 'special',
          component: special, 
        },
        {
          path: 'list/:id',
          name: 'list',
          component: list, 
        },
        {
          path: 'zhuanlan/:id',
          name: 'zhuanlan',
          component: zhuanlan, 
        },
        {
          path: 'user',
          name: 'user',
          component: user,
        },
        {
          path: 'all2',
          name: 'all2',
          component: all2,  
        },
        {
          path: 'home2',
          name: 'homecont2',
          component: homecont2,
        },
        
      ]
    },
    ...shop,
    {
      path: '/dl',
      name: 'dl',
      component: dl
    },
    {
      path: '/kanjia',
      name: 'kanjia',
      component:kanjia,
    },
    {
      path: '/seach',
      name: 'seach',
      component:seach,
    },
    // ...shop
  ]
})
