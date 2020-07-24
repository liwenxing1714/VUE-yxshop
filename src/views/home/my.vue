<template>
    <div>
           <van-nav-bar
  title="我的主页"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="header">
    <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <div>我的主页</div>
</div>
<van-notice-bar
  left-icon="volume-o"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
<div class="my_shoplist">
    <van-button type="primary" color='#ddd' @click='toogto' block>我的订单 &gt;</van-button>
</div>
<van-grid :column-num="3">
  <van-grid-item  icon="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3711206017,1851681921&fm=26&gp=0.jpg" color='#000' text="订单" />
  <van-grid-item @click='address'   icon="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2726684412,3118699029&fm=26&gp=0.jpg" text="地址" />
  <van-grid-item  icon="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=273421905,3542380644&fm=26&gp=0.jpg" text="商品" />
   <van-grid-item  icon="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3711206017,1851681921&fm=26&gp=0.jpg" color='#000' text="订单2" />
  <van-grid-item   icon="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2726684412,3118699029&fm=26&gp=0.jpg" text="地址2" />
  <van-grid-item  icon="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=273421905,3542380644&fm=26&gp=0.jpg" text="商品2" />
</van-grid>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        onClickLeft(){

        },
        toogto(){
            this.$router.push('/dingdan')
        },
        address(){
            
        }
    }
};
</script>

<style scoped>
    .header{
        width: 100%;
        height: 1rem;
        background-color: rgb(228, 228, 228);
        display:flex;

    }
</style>
