<template>
  <div>
    <van-overlay :show="show" >
      <div class="wrapper" >
          
        <div class="block">
            <van-loading size="24px">加载中...</van-loading>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
        show:false
    };
  },
  created() {},
  mounted() {
    this.show=this.$store.state.isLoading
  },
  methods: {}
};
</script>

<style scoped>
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
</style>
