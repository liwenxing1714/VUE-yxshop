<template>
  <div>
    <van-nav-bar title="shop" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" />
    <van-card
      v-for="(item,index) in histortarr"
      :key="index"
      :num="item.nums"
      :price="item.price"
      :desc="item.name"
      :title="item.name"
      :thumb="item.pic"
    >
      <template #footer>
        <van-checkbox v-model="item.checked" checked-color="#07c160">复选框</van-checkbox>
        <!-- <van-button size="mini">按钮</van-button> -->
      </template>
    </van-card>
    <van-submit-bar :price=" num " button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      histortarr: [],
      checked: false,
      numarr: "",
      checklist: [],
      bianhao: []
    };
  },
  created() {
    // 获取储存数据
    let hisshop = window.localStorage.getItem("histortarr");
    if (hisshop) {
      this.histortarr = JSON.parse(hisshop);
    }
  },
  mounted() {
  },
  computed: {
    num() {
      let num = 0;
      this.numarr = this.histortarr
        .filter(item => {
          return item.price;
        })
        .forEach(item => {
          return (num += item.price * item.nums);
        });
      return num * 100;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit() {
      let arr2 = [];
      this.histortarr.forEach(item => {
        let object = new Object();
        object.goodsId = item.good_id;
        object.number = item.nums;
        object.propertyChildIds = item.properties;
        object.logisticsType = 0;
        arr2.push(object);
        // console.log(arr2)
      });

      let use = JSON.parse(localStorage.getItem("user"));
      let formdata = new FormData();
      formdata.append("token", use.token);
      formdata.append("goodsJsonStr", JSON.stringify(arr2));
      this.$axios
        .post("https://api.it120.cc/small4/order/create", formdata)
        .then(res => {
          this.bianhao.push(res.data.data.orderNumber);
        });
       this.$router.push('/order')
    }
  },
  watch: {
    histortarr: {
      handler(value) {
        let arr = value.filter(item => {
          return item.checked == true;
        });
        if (value.length == arr.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    },
    bianhao: {
      handler() {
        window.localStorage.setItem("bianhao", JSON.stringify(this.bianhao));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
