<template>
  <van-pull-refresh class="container"
                    :class="{'placeHoder':audioList.length}"
                    ref="wrapper"
                    v-model="isLoading"
                    @refresh="onRefresh">
    <swiper></swiper>
    <icon></icon>
    <song-list ref="songList"></song-list>
    <new-dish></new-dish>
  </van-pull-refresh>
</template>

<script>
import swiper from './components/swiper'
import icon from './components/icons'
import songList from './components/personalizedSongList'
import newDish from './components/newDish'
import { mapGetters } from 'vuex'

export default {
  name: 'findIndex',
  data () {
    return {
      isLoading: false,
      tips: '为你推荐更多有趣的内容'
    }
  },
  computed: {
    ...mapGetters({ audioList: 'AUDIO_LIST' })
  },
  beforeRouteEnter (to, from, next) {
    next()
    if (from.path === '/pwd') {
      location.reload()
    }
  },
  methods: {
    onRefresh () {
      this.$refs.songList.reGetImgCard()
      setTimeout(() => {
        this.isLoading = false
        this.tips = '已为你推荐新的个性化内容'
      }, 500)
    },
    /**
     * 子组件传过来是否获取数据成功
     */
    isGetOver () {
      return this.$refs.songList.isGetOver
    }
  },
  components: {
    swiper,
    icon,
    songList,
    newDish
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
.placeHoder {
  padding-bottom: 1rem;
}
.tips {
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.23rem;
  border-radius: 0.3rem;
}
</style>
