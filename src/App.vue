<template>
  <div id="app">
    <transition name="router-fade"
                mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- 通过查看播放列表的length来看看播放页面是否可以显示 -->
    <play-song v-show="AUDIO_LIST.length"></play-song>
  </div>
</template>

<script>
import playSong from '@/pages/audioIndex'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    playSong
  },
  computed: {
    ...mapGetters([
      'FULL_SCREEN',
      'AUDIO_LIST'
    ])
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
