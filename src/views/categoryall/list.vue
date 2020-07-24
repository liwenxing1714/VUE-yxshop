<template>
    <div>
        <div>
            <router-link to='/home/all2'>
                返回
            </router-link>
        </div>
        <van-empty description="描述文字" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            cId:0,
            goodlist:[]
        };
    },
    created() {

    },
    mounted() {
        this.cId = this.$route.params.id
        console.log(this.cId)
        this.good()
    },
    methods: {
        good(){
            this.$axios({
                url:"https://api.it120.cc/small4/shop/goods/list"
            }).then(res=>{
                this.goodlist=res.data.data
                console.log(this.goodlist)
            })
        }
    }
};
</script>

<style scoped>

</style>
