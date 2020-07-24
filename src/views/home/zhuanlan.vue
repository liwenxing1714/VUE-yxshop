<template>
    <div>
        <van-nav-bar
  title="标题"
  left-text="返回"
  @click-left="onClickLeft"
  left-arrow
/>
    <div class='cont' >
        <h2>{{ list.title }}</h2>
                <img :src="list.pic" alt="">
                  <div v-html='list.content'></div> 
                  <p>{{ list.descript }}</p>
                
    </div>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            id:''
        };
    },
    created() {

    },
    mounted() {
        this.id=this.$route.params.id

        this.$axios.get('https://api.it120.cc/small4/cms/news/detail',{params:{
            id:this.id
        }}).then((res)=>{
             this.list = res.data.data
            
             console.log(res.data.data)
        })
    },
    methods: {
 onClickLeft(){
            this.$router.go(-1)
        },
    }
};
</script>

<style scoped>
    img{
        width: 100%;
        height: 2rem;
        padding:.2rem 0 .2rem 0;
    }
    .cont{
        text-align:center;
    }
</style>
