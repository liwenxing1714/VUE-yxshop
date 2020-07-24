<template>
  <div>
    <van-tree-select height="100%" :items="items" :main-active-index.sync="active"  v-on:click-nav='leftc'>
      <template #content>
        <div class='option-list'>
            <div class='list-cont' v-for='(item,index) in all' :key='index' v-if='active==0' >
                <van-image width="100" height="100" :src="item.icon" />
                <p>{{ item.name }}</p>
            </div>
            <div class='list-cont' v-for='(item,index) in jujia' :key='index' v-if='active==1' >
                <van-image width="100" height="100" :src="item.icon" />
                <p>{{ item.name }}</p>
            </div>
            <div class='list-cont' v-for='(item,index) in peijian' :key='index' v-if='active==2' >
                <van-image width="100" height="100" :src="item.icon" />
                <p>{{ item.name }}</p>
            </div>
            <div class='list-cont' v-for='(item,index) in fushi' :key='index' v-if='active==3' >
                <van-image width="100" height="100" :src="item.icon" />
                <p>{{ item.name }}</p>
            </div>
            <div class='list-cont' v-for='(item,index) in dianqi' :key='index' v-if='active==4' >
                <van-image width="100" height="100" :src="item.icon" />
                <p>{{ item.name }}</p>
            </div>
           
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      all: [],
      active: 0,
      items: [
          { text: "所有" },
        { text: "居家" },
        { text: "配件装饰" },
        { text: "服饰" },
        { text: "电器" },
        
      ],
      jujia:[],
      peijian:[],
      fushi:[],
      dianqi:[]
    };
  },
  created() {},
  mounted() {
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/category/all")
      .then(res => {
        this.all = res.data.data;
        console.log(this.all)
        this.jujia=this.all.filter((item)=>{
            return item.id==15114 || item.pid==0 ||item.pid==15114
        })
        this.peijian=this.all.filter((item)=>{
            return item.id==15115 || item.pid==15115
        })
        this.fushi=this.all.filter((item)=>{
            return item.id==15116 || item.pid==15116
        })
        this.dianqi=this.all.filter((item)=>{
            return item.id==15114 || item.pid==15124
        })
        console.log(this.jujia);
      });
  },
  methods: {
      leftc(i){
          console.log(i)
          this.active=i
      }
  }
};
</script>

<style scoped>
.option-list{
    width: 100%;
    height: 100%;
    /* background-color: rgb(155, 0, 0); */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
}
.list-cont{
    padding:.1rem;
}
</style>
