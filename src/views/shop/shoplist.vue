<template>
  <div>
    <div class="topbar">
      <p @click="toogto">&lt;</p>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerlist" :key="index">
          <van-image class="van-img" :src="item.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="conts">
      <ul>
        <li>
          <p class="first-cont">{{ contslist.name }}</p>
        </li>
        <li>
          <span class="two-cont">{{ contslist.characteristic }}</span>
        </li>
        <li>
          <div class="mary-active">
            <span class="span1">低价￥{{ contslist.minPrice }}</span>
            <span class="span2">原价￥{{ contslist.minScore }}</span>
          </div>
          <p class="kucun">库存{{ contslist.stores}}</p>
        </li>
      </ul>
    </div>
    <div class="select">
      <van-tabs v-model="active">
        <van-tab title="标签 1">
          <div class="warp-jieshao">
            <p class="jieshao" v-html="shoplist.content"></p>
          </div>
        </van-tab>

        <van-tab title="标签 2">内容 2</van-tab>
      </van-tabs>
    </div>
    <div class="foot">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5"  @click="onClickIcon" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        <van-sku
          v-model="skushow"
          :start-sale-num="nums"
          @stepper-change="changee"
          :sku="sku"
          :goods="goods"
          @sku-selected="selectcar"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // shopnum:10,
      //
      tijiaolist: [],
      skushow: false,
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: "1", name: "红色" },
              { id: "2", name: "蓝色" },
              { id: "3", name: "黑色" }
            ]
          }
        ],
        list: [
          {
            id: 2259, // skuId
            c1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId
            c1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 200, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId
            c1: "3", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 300, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "100", // 默认价格（单位元）
        stock_num: 227 // 商品总库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      },
      customStepperConfig: {
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          //把点击步进器的值，给nums，记录数量
          this.nums = currentValue;
        }
      },
      nums: 2,
      // 选中sku值
      propertyIds: [],
      //
      shoplist: [],
      bannerlist: [],
      contslist: [],
      id: "",
      active: 2,
      histortarr: [],
      dantiao: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    // 储存数据
    let hisshop = window.localStorage.getItem("histortarr");
    if (hisshop) {
      this.histortarr = JSON.parse(hisshop);
    }
  },
  mounted() {
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/detail", {
        params: {
          id: this.id
        }
      })
      .then(res => {
        console.log(res.data.data.basicInfo)
        this.shoplist = res.data.data;
        // console.log(this.shoplist)
        this.bannerlist = this.shoplist.pics;
        this.contslist = this.shoplist.basicInfo;
        this.goods.picture = this.bannerlist[0].pic;
        this.tijiaolist = this.shoplist.basicInfo;
        let tree = [];
        let list = [];
        this.dantiao = res.data.data.properties;
        if (this.dantiao == undefined) {
          return false;
        }
        for (let i = 0; i < this.dantiao.length; i++) {
          let obj = new Object();
          obj.k = this.dantiao[i].name;
          obj.k_s = `c_${this.dantiao[i].id}`;
          obj.v = this.dantiao[i].childsCurGoods;
          tree.push(obj);
        }
        tree.forEach(item => {
          item.v.forEach(ele => {
            let objs = new Object();
            // objs.id = item.k_s.split("_")[1];
            objs[item.k_s] = ele.id;
            objs.price = 1000;
            objs.stock_num = 120;
            list.push(objs);
          });
        });
        this.sku.tree = tree;
        this.sku.list = list;
      });
  },
  methods: {
    selectcar(data) {
      this.propertyIds = `${data.skuValue.propertyId}:${data.skuValue.id}`;
    },
    changee(num) {
      this.nums = num;
      console.log(num);
    },
    toogto() {
      this.$router.go(-1);
    },
    onClickButton() {
      this.skushow = true;
    },
    onBuyClicked() {
    },
    onClickIcon(){
      this.$router.push('/shop')
    },
    onAddCartClicked() {
      let use = JSON.parse(localStorage.getItem("user"));
      if (use == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/denglu");
      } else {
        let index = this.histortarr.findIndex(item => {
          return item.good_id == this.id;
        });
        // console.log(index)
        if (index == -1) {
          let arr = [];
          let object = new Object();
          object.good_id = this.tijiaolist.id;
          object.name = this.tijiaolist.name;
          object.price = this.tijiaolist.originalPrice;
          object.nums = this.nums;
          object.properties = this.propertyIds;
          object.checked = true;
          object.pic = this.tijiaolist.pic;
          this.histortarr.push(object);
          this.skushow = false;
          this.$toast.success("加入购物车成功");
          console.log(object);
          arr.push(object);
        } else {
          this.histortarr[index].nums += this.nums;
          this.$toast.success("+1");
        }
      }
    }
  },
  watch: {
    histortarr: {
      handler() {
        window.localStorage.setItem(
          "histortarr",
          JSON.stringify(this.histortarr)
        );
      },
      deep: true
    }
  }
};
</script>

<style lang='scss'>
.topbar {
  width: 100%;
  height: 0.8rem;

  // background-color: rgb(182, 182, 182);
  color: #fff;
  font-size: 1rem;
  position: absolute;
  text-align: left;
  line-height: 0.8rem;
  //   padding-left: 0.2rem;
  display: flex;
  align-items: center;
  z-index: 10000000;
  > p {
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.25rem;
    border: 0.01rem solid #ddd;
    color: rgb(134, 128, 128);
    font-size: 0.5rem;
  }
}
.banner {
  width: 100%;
  height: 4.14rem;
  > .my-swipe .van-swipe-item {
    width: 100%;
    height: 4.14rem;
    > .van-img {
      width: 100%;
      height: 100%;
    }
  }
}
.conts {
  width: 100%;
  height: 1.5rem;
  > ul {
    width: 100%;
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > li {
      width: 95%;
      display: flex;
      justify-content: space-between;
      // padding-left:.2rem;
      box-sizing: border-box;
      margin-left: 0.16rem;
      > .first-cont {
        font-size: 0.22rem;
        margin-top: 0.16rem;
      }
      > .two-cont {
        font-size: 0.16rem;
        color: #b8b8b8;
        margin-top: 0.16rem;
      }
      > .mary-active {
        font-size: 0.2rem;
        > .span1 {
          color: rgb(235, 6, 6);
        }
        > .span2 {
          font-size: 0.14rem;
          color: #b8b8b8;
          margin-top: 0.06rem;
          width: 3.4rem;
        }
      }
      > .kucun {
        font-size: 0.14rem;
        color: #b8b8b8;
        margin-top: 0.06rem;
        width: 0.8rem;
      }
    }
  }
}
.warp-jieshao {
  width: 100% !important;
  // background-color: rgb(31, 26, 26);
}
.jieshao {
  width: 100% !important;
  font-size: 0.16rem;
  > ul {
    width: 80%;
    // height: 1.8rem;
    display: flex;
    flex-direction: column;
    margin-left: 0.2rem;
  }
  > p {
    > img {
      width: 100% !important;
    }
  }
}

.foot {
  width: 100%;
  height: 0.3rem;
}
</style>
