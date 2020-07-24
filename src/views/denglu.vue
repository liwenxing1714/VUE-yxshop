<template>
    <div>
        <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
             username: '',
            password: '',
        };
    },
    created() {
        
    },
    mounted() {
          
    },
    methods: {
        onSubmit() {
            this.$axios.get('https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey',{params:{
              mobile:this.username,
              pwd:this.password,
        }}).then((res)=>{
            console.log("成功")
            console.log(res.data.data.token)
            window.localStorage.setItem("user",JSON.stringify({mobile:this.username,pwd:this.password,token:res.data.data.token}))
        }).catch((res)=>{
            console.log("失败")
        })
        this.$router.go(-1)
    },
    }
};
</script>

<style scoped>

</style>
