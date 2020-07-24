<template>
    <div class='kanjia'>
        <div class="header">
        <p @click='toog'>&lt;</p> <p>全名砍价</p>   
        </div>
        <ul class="contst">
            <!-- <div class='shoplist'> -->
            <li class='option' v-for='(item,index) in kanjialist' :key='index'>
                <img :src='item.pic' alt="">
                <p>{{ item.name }}</p>
            </li>
            
        <!-- </div> -->
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            kanjialist:[]
        };
    },
    created() {

    },
    mounted() {
        this.$axios.get('https://api.it120.cc/small4/shop/goods/kanjia/list').then((res)=>{
            this.kanjialist = res.data.data.goodsMap
           console.log(this.kanjialist)
        })
    },
    methods: {
        toog(){
            this.$router.push('/home/home2')
        }
    }
};
</script>

<style lang='scss' scoped>
.kanjia{
    width: 100%;
  
    >.header{
        width: 100%;
        height: .2rem;
        background-color: rgb(133, 131, 131);
        display: flex;
        >p{
            color: #fff;
            font-size:.2rem;
            text-align:left;
            padding-left:.2rem;
        }
        
    }
    >.contst{
        width: 100%;
        display: flex;
        flex-direction: column;
        >li{
            width: 100%;
            height: 3rem;
            display: flex;
            justify-content: space-between;
            padding:.1rem 0 .1rem 0;
            // text-align:center;
            align-items: center;
            border: .01rem solid #ddd;
            border-left:none;
            border-right:none;
            >img{
                width: 50%;
                height: 3rem;
            }
            >p{
                font-size:.2rem;

            }
        }
    }
}
</style>
