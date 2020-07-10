<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <van-tabbar v-model="active">
  <van-tabbar-item name="home" icon="home-o" to="/home" >标签</van-tabbar-item>
  <van-tabbar-item name="search" icon="search" to="/fl">标签</van-tabbar-item>
  <van-tabbar-item name="friends" icon="friends-o" to="/shop">标签</van-tabbar-item>
  <van-tabbar-item name="setting" icon="setting-o" to="/user">标签</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      active:''
    }
  },
  methods:{
    changee(i){
      alert(1)
      console.log(1111)
      // if(i==0){
      //   this.$router.push('fl')
      // }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
