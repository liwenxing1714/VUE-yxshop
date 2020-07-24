<template>
  <div>
      <div class='header'>
          <router-link to='/home/home2'>
              返回
          </router-link>
      </div>
      
      <keep-alive>
           <seach></seach>
      </keep-alive>
     
    <van-tree-select height="100%" :items="items" :main-active-index.sync="active"  v-on:click-nav='leftc'>
      <template #content>
        <div class='option-list'>
            <div class='list-cont' v-for='(item,index) in activ' :key='index'  >
                <router-link  :to="'list/'+item.id">
                    <van-image width="100" height="100" :src="item.icon" />
                    <p>{{ item.name }}</p>
                </router-link>
               
            </div> 
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import seach from '@/views/seach/seach'
export default {
  data() {
    return {
     catid:[0],
      all: [],
      active: 0,
      items: [{ text: "所有" }],
      str:'',
      strlist:[],
      arr:[1,2,3]
    };
  },
  created() {},
  components:{
      seach,
  },
  computed:{
      activ(){
          if(this.active==0){
              return this.all
          }
          return this.all.filter((item)=>{
              return item.pid==this.catid[this.active]
          })
      }
  },
  mounted() {
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/category/all")
      .then(res => {
        this.all = res.data.data;
        console.log(this.all)
       this.all.forEach((item)=>{
           if(item.pid==0){
               this.items.push({ text: item.name },),
               this.catid.push(item.id)
           }
       })
       
       console.log(this.all)
      });
  },
  methods: {
      leftc(i){
          console.log(this.active)
      },
      keyup(){
          console.log(this.all[2].type)
          console.log(this.arr.include(this.str))
        this.all.filter((item)=>{
            console.log(item.type.include(this.str))
            return item.type.include(this.str)
        })
      },
    //   toog(){
    //       this.$router.push('/seach')
    //   }
  }
};
</script>

<style lang='scss' scoped>
.option-list{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.list-cont{
    padding:.1rem;
    text-align: center;
}
.seach{
    width: 100%;
    height: .3rem;
    display: flex;
    justify-content: space-around;
    position: relative;
    >input{
        width: 80%;
        height: .25rem;
        border: .01rem solid #ddd;
        border-radius:.15rem;
    }
    >ul{
        width: 100%;
        position: absolute;
        background-color: rgb(219, 20, 20);
    }
}
</style>
