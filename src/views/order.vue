<template>
    <div>
        <van-nav-bar
  title="下订单"
  left-text="返回"
  right-text="按钮"
  left-arrow
  
  @click-right="onClickRight"
/>
<!-- 联系人卡片 -->
<van-contact-card type="edit" name="张三" tel="13000000000" :editable="false" />
    <van-card
      v-for="(item,index) in arr"
      :key="index"
      :num="item.nums"
      :price="item.price"
      :desc="item.name"
      :title="item.name"
      :thumb="item.pic"
    >
     <template #footer>
    <van-checkbox v-model="item.checked" checked-color="#07c160">复选框</van-checkbox>
    
  </template>
     </van-card>
     <van-button class='btn' color="red" @click='submit'>提交订单</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
           arr:[],
           bianhao:[]
        };
    },
    created() {
        
    },
    mounted() {
    this.arr = JSON.parse(localStorage.getItem('histortarr'))
    this.bianhao = JSON.parse(localStorage.getItem('bianhao'))
    console.log(this.bianhao)
    },
    methods: {
        onClickRight(){
            
        },
        submit(){
           
            this.$router.push('/zhifu')
        }
    },
    watch:{
       
    }
};
</script>

<style scoped>
    .btn{
        width: 100%;
        height: 0.5rem;
        position:absolute;
        bottom:0;
    }
</style>
