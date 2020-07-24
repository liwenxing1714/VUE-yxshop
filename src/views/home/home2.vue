<template>
    <div class='home'>
        <div class='banner'>
             <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in list" :key="index">
                    <img :src="image.picUrl" alt="">
                </van-swipe-item>
             </van-swipe>
        </div>
       <ul class='select'>
           <li>
               <van-icon name="like" color="#1989fa"/>
               <p>签到</p>
           </li>
            <li>
               <van-icon name="wap-home" color="#07c160"/>
               <p>礼券</p>
           </li>
            <li>
               <van-icon name="diamond" color="#1989fa"/>
               <p @click='toog'>砍价</p>
           </li>
            <li>
                <router-link to='special'>
                    <van-icon name="volume" color="#1989fa"/>
                    <p>专栏</p>
                </router-link>
               
           </li>
       </ul>
    <div class='select-bottom'> </div>
        <div class='select-kj'>
            <p  class='cont-title'>全名砍价></p>
            <ul>
                <li v-for="(image, index) in kanjia" :key="index">
                   <img :src="image.pic" alt="">
                   <div>
                       <p>{{ image.characteristic}}</p>
                       <p>底部</p>
                   </div>
                </li>
            </ul>
        </div>
        <div class='pick'>
            <div class='topbgc'></div>
            <p class='cont-title'>精选专题</p>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item  v-for="(image, index) in pick" :key="index">
                    <router-link :to="'zhuanlan/'+image.id">
                        <div class='option-cont'>
                            <img :src="image.pic" alt="" >
                            <p>{{ image.title }}</p>
                            <p>{{ image.descript }}</p>
                        </div>
                    </router-link>
                </van-swipe-item>
             </van-swipe>
        </div>
        <div class='shoplist'>
           
            <div class='option' v-for='(item,index) in shoplist' :key='index'>
                <router-link  :to="'/shoplist/'+item.id">
                    <img class='imgs' src='' :data_src='item.pic' alt="">
                    <p>{{ item.minPrice }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/style/reset.css';
export default {
    data() {
        return {
            active:'',
            list:[],
            kanjia:[],
            pick:[],
            shoplist:[],
            screenWidth: document.body.clientWidth,
        };
    },
    created() {

    },
    mounted() {

         const _this = this;
    // 画echars
    // 监听浏览器窗口变化
    window.onresize = function() {
      // console.log("agag")
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        // console.log(111)
      })();
    };






        this.$nextTick(()=>{
                this.lazyload()
            })
        window.addEventListener('scroll',this.lazyload);
        window.addEventListener('onresize',this.fff);
        this.fff()
            this.$axios.get('https://api.it120.cc/small4/banner/list').then((res)=>{
            this.list = res.data.data
        })
         this.$axios.get('https://api.it120.cc/small4/shop/goods/kanjia/list').then((res)=>{
           let kanjia = Object.keys(res.data.data.goodsMap).splice(-3)
           let tem=[]
          kanjia.forEach((item)=>{
              tem.push(res.data.data.goodsMap[item])
          })
            this.kanjia=tem
        })
 this.$axios.get('https://api.it120.cc/small4/cms/news/list').then((res)=>{
            this.pick = res.data.data
        })
        this.$axios.get('https://api.it120.cc/small4/shop/goods/list').then((res)=>{
            let arr = res.data.data
           function sortNumber(a,b){//升序
            return a.minPrice - b.minPrice
            }
            arr.sort(sortNumber);
            this.shoplist = arr
            // console.log(this.shoplist)
            
            
        })
       
    },
    methods: {
        changee(i){
            console.log(i)
        },
        toog(){
            this.$router.push('/kanjia')
        },
       
        lazyload(){
            let html = document.documentElement || document.body
            let imgs = document.querySelectorAll(".imgs")
            // console.log(imgs)
            for(var i = 0; i<imgs.length; i++){
                if(html.scrollTop + html.clientHeight-150 > imgs[i].offsetTop){
                    this.$toast.loading('努力加载中')
                    // setTimeout(()=>{
                        imgs[i].src = imgs[i].getAttribute("data_src")
                    // },1000)
                }
            }
        },
        fff(){
            this.$store.commit("addCount",1000)
        }
    }
};

</script>

<style lang='scss' scoped>
body{
    width: 100%;
    background-color: rgb(116, 255, 2);
}
.home{
    width: 100%;
}
.banner{
    .my-swipe .van-swipe-item {
        width: 100%;
        height: 3.78rem;
        // background-color: rgb(221, 103, 103);
        text-align: center;
    img{
        width: 100%;
        height: 100%;
    }
  };
}
   
.select{
     width: 100%;
    height: 1rem;
    background-color: rgb(255, 255, 255);
    border-radius:.15rem .15rem 0 0;
    position: relative;
    bottom:1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    >li{
        text-align:center;
    }
}
.select-bottom{
    width: 100%;
    height: .2rem;
    background-color: rgb(167, 167, 167);
    position:relative;
    bottom:1rem;
}
.select-kj{
    position:relative;
    bottom:1rem;
     width: 100%;
    >ul{
        // display: flex;
        >li{
            width: 100%;
            display:flex;
            border-bottom: .01rem solid #ddd;
            padding-bottom: .1rem;
            img{
                width: 1.25rem;
                height: 1.25rem;
            }
            >div{
                display: flex;
                padding:.1rem 0 .1rem 0;
                flex-direction:column;
                // text-align:center;
                align-items: center;
                justify-content: space-between;
                font-size:.16rem;
                >p{
                    font-size:.16rem;
                }
            }
        }
    }
}
.cont-title{
    text-align:center;
}
.pick{
    >.topbgc{ 
        width: 100%;
        height: .2rem;
        background-color: rgb(170, 167, 167); 
    }
    width: 100%;
    height: 2rem;
    position:relative;
    bottom:1rem;
    .my-swipe .van-swipe-item {
        .option-cont{
            width: 100%;
            height: 3.3rem;
            font-size:.16rem;
            >img{
                width: 100%;
                height: 2.26rem;
            }
            >p{
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
        }
    
    }
}
.shoplist{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top:1rem;
    justify-content: space-around;
    >.option{
        width: 46%;
        height: 2rem;
        border: .01rem solid #ddd;
        img{
            width: 100%;
            height: 1.5rem;
        }
        p{
            font-size:.18rem;
        }
    }
}
</style>
