<template>
    <div class='home'>
        
 <van-overlay :show="show" >
      <div class="wrapper" >
          
        <div class="block">
            <van-loading size="24px">加载中...</van-loading>
        </div>
      </div>
    </van-overlay>


        <router-view></router-view>
            <van-tabbar v-model="active">
                <van-tabbar-item name="home" icon="home-o" to="/home/home2" >首页</van-tabbar-item>
                <van-tabbar-item name="search" icon="search" to="/home/all2" >分类</van-tabbar-item>
                <van-tabbar-item name="friends" icon="friends-o" to="/shop" >标签</van-tabbar-item>
                <van-tabbar-item name="setting" icon="setting-o" to="/home/user" >标签</van-tabbar-item>
            </van-tabbar>


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
            show:true
        };
    },
    created() {
        // console.log(this.$store.state.isLoading)
    },
    mounted() {
        setTimeout(()=>{
        this.show=this.$store.state.isLoading
        // console.log(this.$store.state.isLoading)
        },2000),
            this.$axios.get('https://api.it120.cc/small4/banner/list').then((res)=>{
            this.list = res.data.data
            // console.log(this.list)
        })
        let tokenn = localStorage.getItem('user');
        let a=JSON.parse(tokenn)
    // 砍价接口
        // this.$axios.get('https://api.it120.cc/small4/shop/goods/kanjia/join',{params:{
        //     token:a.token,
        //     kjid:'5346:17870'
        // }}).then((res)=>{
        //     console.log(res.data)
        // })
    

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
            // console.log(this.pick)
        })

        this.$axios.get('https://api.it120.cc/small4/shop/goods/list').then((res)=>{
            let arr = res.data.data
           function sortNumber(a,b){//升序
            return a.minPrice - b.minPrice
            }
        
            arr.sort(sortNumber);
            
            this.shoplist = arr
            
        })
    },
    methods: {
       
    }
};
</script>

<style lang='scss' scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: rgb(83, 74, 74);
  }
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
        >img{
            width: 100%;
            height: 1.5rem;
        }
        >p{
            font-size:.18rem;
        }
    }
}
</style>
