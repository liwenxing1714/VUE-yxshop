<template>
    <div>
        <van-nav-bar
  title="标题"
  left-text="返回"
  @click-left="onClickLeft"
  left-arrow
/>
<ul class='select'>
    <li v-for='(item,index) in list' :key='index'>
        <van-image class='van-img'  :src="item.pic" />
        <div class='cont'>
            <p>{{ item.descript }}</p>
            <router-link :to="'zhuanlan/'+item.id">
                <van-button round type="info" color="rgba(0,0,0,0.3)">{{ item.title }}</van-button>
            </router-link>
            
        </div>
        
    </li>
</ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            cid:''
        };
    },
    created() {
        // console.log(this.$router.params.id)

    },
    mounted() {
         this.$axios.get('https://api.it120.cc/small4/cms/news/list').then((res)=>{
            this.list = res.data.data
             console.log(this.list)
        })
       
    },
    methods: {
        onClickLeft(){
            this.$router.push('/home/home2')
        },
        
    }
};
</script>

<style lang='scss' scoped>
    .select{
        width: 100%;
        >li{
            width: 100%;
            height: 2rem;
            position: relative;
            padding:.1rem 0 .1rem 0;
            >.van-img{
                width: 100%;
                height: 2rem;
                // position: absolute;
            }
            >.cont{
                width: 100%;
                position: absolute;
                top:.7rem;
                color: #fff;
                font-size:.18rem;
                text-align:center;
            }
        }
    }
</style>
