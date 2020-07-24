<template>
    <div class='app'>
        <van-nav-bar
  title="支付页面"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
/>
    <ul>
        <li v-for='(item,index) in list' :key='index'>订单编号:{{ item }}</li>
    </ul>
    <button @click='submit'>立即支付</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[]
        };
    },
    created() {
        let list = localStorage.getItem('bianhao')
        this.list = JSON.parse(list)
        console.log(this.list)
    },
    mounted() {

    },
    methods: {
onClickLeft(){
    this.$router.go(-1)
},
submit(){
    this.$toast.loading({
        message:'支付成功',
        overlay: true
    })
    setTimeout(()=>{
        this.$router.push('/home/home2')
    },2000)
},
    }
};
</script>

<style scoped>
html{
    height: 100%;
}
body{
    height: 100%;
}
.app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content:space-between; */
}
ul{
    flex:1;
}
li{
    width: 100%;
    height: .3rem;
}
button{
    background-color: red;
    color: #fff;
    height: .5rem;
    font-size:.2rem;
}
</style>
