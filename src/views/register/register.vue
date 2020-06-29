<template>
    <div class='box-warp'>
        <h3>注册页面</h3>
        <van-form @submit="onSubmit">
                <van-field v-model="phone" label="" class='account' right-icon="phone-o" placeholder="请输入账号" />
                <van-field
                 v-model="password"
                  label=""
                   class='account'
                   :type="posswordshop?'password':'text'"
                    :right-icon="posswordshop?'closed-eye':'eye-o'"
                     placeholder="密码"
                     @click-right-icon='posswordshop=!posswordshop'
                      />
                <van-field
                 v-model="password2"
                  label=""
                 :type="posswordshop2?'password':'text'"
                   class='account'
                    :right-icon="posswordshop2?'closed-eye':'eye-o'"
                     placeholder="确认密码"
                     @click-right-icon='posswordshop2=!posswordshop2'
                      />
                <van-field v-model="users" label="" class='account' right-icon="contact" placeholder="用户名" />
                <!-- 地区选择 -->
             <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                 <van-area title="标题" :area-list="columns" value="310000" @confirm='addsite' />
            </van-popup>

                <van-field v-model="site" label="" class='account' right-icon="location-o" placeholder="地址" @click='show=!show'/>
                <!-- 图像验证 -->
                 <van-field placeholder="图形验证码" class="inp" v-model='keyCode' >
                    <template #right-icon>
                        <van-image width="1.5rem" height="1rem" :src="imgurl" @click="createImgCode" />
                    </template>
                </van-field>

                <van-field v-model="verify" center clearable label="短信验证码" placeholder="请输入短信验证码" class='verify'>
                    <template #button>
                        <van-button size="small" :disabled="btnIsDisabled" type="primary" @click='sendCode'>{{ msg }}</van-button>
                    </template>
                </van-field>
                <van-button class='btn' @click='changFun' round type="info">圆形按钮</van-button>
        </van-form>
    </div>
</template>

<script>
import '@/assets/style/reset.css';

import Area from '@/assets/diqu/area'
export default {
    data() {
        return {
            //手机号
            phone:'',
            //密码
            password:'',
            password2:'',
            //密码正常隐藏显示
            posswordshop:true,
            posswordshop2:true,
            // 用户名
            users:'',
            //地址
            site:'',
            //验证
            keyCode:'',
            verify:'',
            key:'',
            btnIsDisabled:false,
            //地区选择
            show:false,
            // 地区内容
            columns:Area,
            // 图片地址
            imgurl:'',
            msg:'发送验证码'
        };
    },
    created() {
       
    },
    mounted() {
        this.createImgCode()
    },
    methods: {
        onSubmit(){

        },
        changFun(){
            // 检查是否输入完整
            if(this.phone=='' || this.password=='' || this.password2=='' || this.users=='' ){
                this.$toast.fail('请输入完整')
                return false
            }
            //校验手机号的格式是否合法
      var reg = /^1[345678]\d{9}$/;
      if(!reg.test(this.phone)){
        this.$toast.fail("请输入正确的手机号");
        return false;
      }
       //确认密码和密码是否一致
      if(this.possword != this.possword2){
        this.$toast.fail("密码不一致，请重新输入");
        return false;
      }
      this.$toast.success("恭喜你,注册成功");
   
        },
        createImgCode(){
      //生成生成图像验证码的随机参数
      this.key = (new Date()).getTime();
      let apiUrl = "https://api.it120.cc/small4/verification/pic/get";
      this.imgurl = `${apiUrl}?key=${this.key}`;
    },
    addsite(arr){
        this.show=!this.show
    this.site=arr[0].name+arr[1].name+arr[2].name
       
    },
    // 倒计时计时器
     countSeconds(){
      this.btnIsDisabled = true;
      //倒计时的时间
      let timeout = 60;
      //倒计时间歇
      let timer = setInterval(() => {
        //读秒结束
        if(timeout<1){
          this.btnIsDisabled =false;
          //清除定时器
          clearInterval(timer);
          this.msg = `重新发送`;
          return false;
        }
        //正在倒计时的时候
        this.msg = `${timeout}s后再试`
        timeout--;
      }, 1000);
    },
    //发送验证码接口
    sendCode(){
      this.$axios({
        url:"https://api.it120.cc/small4/verification/sms/get",
        params:{
          mobile: this.phone,
          key: this.key,
          picCode: this.keyCode,
        }
      }).then(res=>{
        console.log(res);
        //校验失败的时候
        if(res.code !=0){
          this.$toast.fail(res.msg);
          return false;
        }
        this.countSeconds();//调用倒计时的方法
      })
    }
  
    }
};
</script>

<style long='sass' scoped>
.box-warp{
    margin: 0;
    padding:0;
}
h3{
    margin-top:.1rem; 

}
   .account{
       width: 80%;
       height: .45rem;
       border: .01rem solid #dddddd;
       border-radius:.15rem;
       margin: 0 auto;
       margin-top: .15rem;
   }
   .btn{
       width: 80%;
       height: .4rem;
       background-color: rgb(196, 240, 2);
       border: none;
       margin:.1rem;
       outline:none;
   }
   .inp{
       width: 80%;
       margin:0 auto;
       height: 1rem;
   }
   .verify{
       width: 80%;
       margin: .2rem auto;
   }
</style>
