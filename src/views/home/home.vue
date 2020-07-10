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
               <van-icon name="like" />
               <p>签到</p>
           </li>
            <li>
               <van-icon name="wap-home" />
               <p>礼券</p>
           </li>
            <li>
               <van-icon name="diamond" />
               <p>砍价</p>
           </li>
            <li>
               <van-icon name="volume" />
               <p>签到</p>
           </li>
       </ul>
    <div class='select-bottom'> </div>
        <div class='select-kj'>
            <p>全名砍价></p>
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
            <p>精选专题</p>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in pick" :key="index">
                    <div>
                         <img :src="image.pic" alt="">
                         <p>{{ image.title }}</p>
                         <p>{{ image.descript }}</p>
                    </div>
                   
                </van-swipe-item>
             </van-swipe>
        </div>



        <!-- <van-tabbar >
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>

<script>
import '@/assets/style/reset.css';
export default {
    data() {
        return {
            list:[],
            kanjia:[],
            pick:[]
        };
    },
    created() {

    },
    mounted() {
            this.$axios.get('https://api.it120.cc/small4/banner/list').then((res)=>{
            this.list = res.data.data
            // console.log(this.list,this.list[0].picUrl )
        })

         this.$axios.get('https://api.it120.cc/small4/shop/goods/kanjia/list').then((res)=>{
           let kanjia = Object.keys(res.data.data.goodsMap).splice(-3)
           let tem=[]
          kanjia.forEach((item)=>{
              tem.push(res.data.data.goodsMap[item])
          })
            this.kanjia=tem
        //    console.log(this.kanjia)
        })

 this.$axios.get('https://api.it120.cc/small4/cms/news/list').then((res)=>{
            this.pick = res.data.data
            // console.log(this.pick)
        })
    },
    methods: {

    }
};
</script>

<style lang='scss' scoped>
.banner{
    .my-swipe .van-swipe-item {
        width: 3.78rem;
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
        >div{
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
</style>
