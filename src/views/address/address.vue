<template>
  <div>
      <van-nav-bar
  title="地址栏"
  left-text="返回"
  right-text="新增地址"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted(){
      //    增加地址接口
        this.$axios.get('https://api.it120.cc/small4/user/shipping-address/add',{params:{
             token:"eb53c694-b0bd-4079-814b-4ce8061b9c58",
            linkMan:'李文星',
            mobile:13259593224,
            address:"黑龙江省哈尔滨市道里区",
            provinceId:"黑龙江省",
            cityId:"哈尔滨市道里区",
        }}).then((res)=>{
            console.log(res.data)
        })
  },
    
  computed() {},
  components: {},
  methods: {
      onClickLeft(){},
      onClickRight(){}
  },
  watch: {}
};
</script>

<style scoped>
</style>
