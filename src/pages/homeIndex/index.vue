<template>
  <div class="container"
       :style="[audioList.length?{paddingBottom:'1rem'}:{}]">
    <home-icons></home-icons>
    <home-list :num="homeListNum"></home-list>
    <div class="split"></div>
    <song-list ref="songList"
               :index="songListNum"
               @showSlider="showSlider"
               @heartMode="_heartMode"></song-list>
    <slider ref="slider"
            :title="title"
            :id="id"
            :homeFavoritelistSlider="homeFavoritelistSlider"
            :homePlaylistSlider="homePlaylistSlider"></slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import homeIcons from './components/icons'
import homeList from './components/homeList'
import songList from './components/songList'
import slider from 'base/slider'
import api from 'api'

export default {
  name: 'homeIndex',
  data () {
    return {
      // 我的页面上部列表
      homeListNum: {
        // 播放记录
        recordNum: 0,
        // 我的电台
        djNum: 0,
        collectNum: 0
      },
      songListNum: {
        // 创建的歌单
        createNum: 0,
        // 收藏的歌单
        favoritesNum: 0
      },
      heartModeList: [],
      title: '',
      id: 0,
      homePlaylistSlider: false,
      homeFavoritelistSlider: false
    }
  },
  components: {
    homeIcons,
    homeList,
    songList,
    slider
  },
  methods: {
    /**
     * 开启心动模式
     */
    _heartMode (id, pid) {
      api.heartModeFn(id, pid)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            let arr = data.data
            this.ruleModeList(arr, 'songInfo')
            console.log(this.heartModeList)
            this.startPlayAll({
              list: this.heartModeList
            })
          }
        })
    },
    /**
     * 对请求到的心动模式数据进行修改，使得可以播放
     */
    ruleModeList (arr, item) {
      arr.forEach(ele => {
        this.heartModeList.push(ele[item])
      })
    },
    /**
     * 显示下方的滑块
     */
    showSlider (name, id, type) {
      this.title = '歌单：' + name
      this.id = id
      if (type) {
        this.homeFavoritelistSlider = true
        this.homePlaylistSlider = false
      } else {
        this.homeFavoritelistSlider = false
        this.homePlaylistSlider = true
      }
      this.$refs.slider.showSlider()
    },
    ...mapActions(['startPlayAll'])
  },
  computed: {
    ...mapGetters({ loginState: 'LOGIN_STATE', audioList: 'AUDIO_LIST' }),
    ...mapGetters({ accountUid: 'ACCOUNT_UID' })
  },
  activated () {
    /**
     *
     * 需要增加判断，要不然每次跳转到这个路由都会有事件
     *
     */
    // 获取用户登录成功后储存的登录标志
    let getFlag = +localStorage.getItem('loginState')
    if (this.loginState || getFlag) {
      Promise.all([
        api.albumCollec(),
        api.userInfoFn(new Date()),
        api.userRecordFn(localStorage.getItem('accountUid'))
      ]).then((res) => {
        let [collectData, userInfoData, userRecordData] = res
        collectData = collectData.data.data
        userInfoData = userInfoData.data
        userRecordData = userRecordData.data
        this.homeListNum.collectNum += collectData.length + userInfoData.artistCount + userInfoData.mvCount
        this.homeListNum.djNum = userInfoData.djRadioCount
        // 更新创建的歌单数
        this.songListNum.createNum = userInfoData.createdPlaylistCount
        // 更新收藏的歌单数
        this.songListNum.favoritesNum = userInfoData.subPlaylistCount

        this.homeListNum.recordNum = userRecordData.weekData.length
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@import url("//at.alicdn.com/t/font_1322300_t3s39ptd6ao.css");
</style>
