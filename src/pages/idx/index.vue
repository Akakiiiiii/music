<template>
  <div class="wrapper pd23">
    <general-nav @returnPage="returnPage"
                 class="titleFixed">
      <span class="text">排行榜</span>
    </general-nav>
    <page-loading v-if="load"></page-loading>
    <div v-show="!load">
      <div class="title">官方榜</div>
      <idx-card v-for="(item, index) in officialIdxList"
                :key="index"
                :imgUrl="item.coverImgUrl"
                :tracks="item.tracks"
                :idx="item.name"
                :updateTime="item.updateFrequency"
                @showIdxPage="showIdxPage(item)"></idx-card>
      <div class="title">推荐榜</div>
      <div class="img-col">
        <img-card v-for="(item, index) in recommendedIdxList"
                  :key="index"
                  :imgUrl="item.coverImgUrl"
                  :dec="item.name"
                  :updateTime="item.updateFrequency"
                  :idx="item.name"
                  @showIdxPage="showIdxPage(item)"></img-card>
      </div>
      <div class="title">更多榜单</div>
      <div class="img-col">
        <img-card v-for="(item, index) in moreIdxList"
                  :key="index"
                  :imgUrl="item.coverImgUrl"
                  :dec="item.name"
                  :updateTime="item.updateFrequency"
                  :idx="item.name"
                  @showIdxPage="showIdxPage(item)"></img-card>
      </div>
    </div>
  </div>
</template>

<script>
import generalNav from 'base/generalNav'
import idxCard from 'base/idxCard'
import imgCard from 'base/imgCard'
import pageLoading from 'base/pageLoading'

import api from 'api'

export default {
  name: '',
  data () {
    return {
      load: true,
      officialIdxList: [],
      recommendedIdxList: [],
      moreIdxList: []
    }
  },
  created () {
    this._getIdxInfo()
  },
  methods: {
    _getIdxInfo () {
      api.topListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.officialIdxList = data.list.slice(0, 4)
            this.recommendedIdxList = data.list.slice(4, 10)
            this.moreIdxList = data.list.slice(10)
            this.load = false
          }
        })
    },
    returnPage () {
      this.$router.go(-1)
    },
    showIdxPage (item) {
      console.log(item)
      this.$router.push({
        name: 'albumPage',
        params: {
          albumId: item.id,
          imgUrl: item.coverImgUrl,
          name: item.name
        }
      })
    }
  },
  components: {
    generalNav,
    idxCard,
    imgCard,
    pageLoading
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  .text {
    font-size: 0.4rem;
    vertical-align: 5px;
  }
  .title {
    font-weight: 700;
    height: 1rem;
    line-height: 1rem;
  }
  .img-col {
    .flex-between();
    flex-wrap: wrap;
  }
}
</style>
