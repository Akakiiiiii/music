<template>
  <div class="banner-container">
    <van-swipe :autoplay="5000"
               indicator-color="#dd001b">
      <van-swipe-item v-for="(item, index) in swiperList"
                      :key="index">
        <img class="banner-img"
             v-lazy="item.pic"
             alt />
        <span class="title"
              :style="{background:item.titleColor}">{{item.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import api from 'api'

export default {
  name: 'findSwiper',
  data () {
    return {
      // 存放图片组信息
      swiperList: []
    }
  },
  methods: {
    _getFindInfo () {
      api.bannerSwiperFn()
        .then(this.getFindInfoSuc)
    },
    getFindInfoSuc (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.banners
        this.swiperList = res
      }
    }
  },
  created () {
    this._getFindInfo()
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");

.banner-container {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.2rem;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: @imgBorderRadius;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: 0.8;
    border-top-left-radius: @imgBorderRadius;
  }
}
</style>
