<template>
    <div>
        <van-search
  v-model="value"
  shape="round"
  background="rgb(171, 233, 0)"
  placeholder="请输入搜索关键词"
  @focus='toogw'
  @search='keyword'
/>
    <div class='seach-history'>
        <div class='hiscon'><span>历史搜索</span><van-icon name="cross" /></div>
        <ul>
            <li v-for='(item,index) in historylist' :key='index'>{{item}}</li>
        </ul>
    </div>
    <ul class='seach-cont' >
        <li v-for='(item,index) in seachlist' :key='index'>
            <img :src="item.pic" alt="">
            <p>{{ item.name }}</p>
        </li>
    </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value:'',
            alllist:[],
            historylist:[]
        };
    },
    created() {
        let obj = window.localStorage.getItem('historylist')
        // console.log(obj,JSON.parse(obj))
        if(obj){
            this.historylist=JSON.parse(obj)
        }
    },
    computed:{
        seachlist(){
            return this.alllist.filter((item)=>{
                return item.name.includes(this.value)
            })
        },

    },
    mounted() {
         this.$axios
      .get("https://api.it120.cc/small4/shop/goods/list")
      .then(res => {
          this.alllist=res.data.data
        //   console.log(res.data.data)
      })
    },
    methods: {
        toogw(){
            this.$router.push('/seach')
        },
        keyword(){
            this.historylist.unshift(this.value)
            
        }
    },
    watch:{
         historylist:{
                handler(){
                    window.localStorage.setItem("historylist",JSON.stringify(this.historylist))
                },
                deep:true,
            }
    }
};
</script>

<style lang='scss' scoped>
    .seach-history{
        >.hiscon{
            font-size:0.18rem;
            display: flex;
            justify-content: space-between;
            padding:0 0.1rem 0 .1rem;
        }
        >ul{
            display: flex;
            
            >li{
                font-size:.18rem;
                padding:.2rem;
            }
        }
    }
    .seach-cont{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        >li{
            width: 45%;
            padding:.1rem;
            >img{
                width: 100%;
                height: 2rem
            }
            >p{
                font-size:.18rem;
            }
        }
    }
</style>
