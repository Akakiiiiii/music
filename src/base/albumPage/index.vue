<template>
  <!-- 通过传递参数给子组件，标题，加载样式，图片链接，歌单名称，作者头像，作者昵称，歌单介绍，评论数，分享数，歌单歌曲数，收藏数，是否收藏 -->
  <song-list-page :title="title"
                  :load="load"
                  :imgUrl="imgUrl"
                  :albumTitle="name"
                  :albumId="albumId"
                  :idxId="idxId"
                  :idxComId="idxComId"
                  :dishId="dishId"
                  :creatorImgUrl="albumInfo.creator ? albumInfo.creator.avatarUrl : albumInfo.album ? albumInfo.album.artist.picUrl:''"
                  :author="albumInfo.creator ? albumInfo.creator.nickname : albumInfo.album ? albumInfo.album.artist.name : ''"
                  :description="albumInfo.description ? albumInfo.description : albumInfo.album ? albumInfo.album.description : ''"
                  :commentCount="albumInfo.commentCount ? albumInfo.commentCount : albumInfo.album ? albumInfo.album.info.commentCount : 0"
                  :shareCount="albumInfo.shareCount ? albumInfo.shareCount : albumInfo.album ? albumInfo.album.info.shareCount : 0"
                  :trackCount="albumInfo.trackCount ? albumInfo.trackCount : albumInfo.album ? albumInfo.album.size : 0"
                  :subscribedCount="albumInfo.subscribedCount"
                  :subscribed="albumInfo.subscribed"
                  :isSubIn="albumInfo.subscribed"
                  :playCount="albumInfo.playCount"
                  @startPlayAll="startPlay">
    <!-- 这是一个通用的用来展示歌曲列表的组件，通过for循环组件进行渲染  这里使用 index+1 展示了页面的索引值 -->
    <song-list v-for="(item, index) in albumInfo.tracks || albumInfo.songs"
               :key="index"
               :songName="item.name"
               :artists="item.ar"
               :albumName="item.al.name"
               :num="index + 1"
               @beginSong="setAudioList(item, index)"
               :nowSong="item.id === audioSong.id"></song-list>
  </song-list-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import songList from 'base/song'
import songListPage from 'base/songListPage'
import api from 'api'

export default {
  name: 'albumPage',
  data () {
    return {
      // 存储信息的数组
      albumInfo: [],
      // 用来定义是否显示load加载组件
      load: true,
      dishId: 0,
      idxId: 0,
      idxComId: 0,
      albumId: 0,
      title: '',
      imgUrl: '',
      name: ''
    }
  },
  components: {
    songListPage,
    songList
  },
  /**
   * 生命钩子函数在实例创建完成后被立即调用
   */
  created () {
    this.getParams()
    this.load = true
    this.albumInfo = []
    let dishId = this.$route.params.dishId
    if (this.albumId) {
      this.title = '歌单'
      this._getInfo(this.albumId)
      this.setAlbumId(this.albumId)
      return
    }
    if (dishId) {
      this.title = '专辑'
      this.dishId = +dishId
      this._getDishInfo(dishId)
    }
  },
  activated () {
    if (this.lastAlbumId !== this.$route.params.albumId) {
      this.load = true
      this.getParams()
      this._getInfo(this.albumId)
      this.setAlbumId(this.albumId)
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG', lastAlbumId: 'ALBUM_ID' })
  },
  methods: {
    ...mapMutations({ setAlbumId: 'SET_USING_ALBUM_ID' }),
    /**
     * 根据传入的id获取歌单信息
     *
     * 这里需要增加 catch 方法！！！
     */
    _getInfo (id) {
      // 这里使用的是定义的接口信息，详情查看 api 文件夹
      api.albumDetailFn(id)
        // 请求成功后返回数据
        .then(res => {
          console.log(res.data)
          // 接受数据
          const data = res.data
          // 查看返回数据的 code 状态，如果是 200 的话进行使用
          if (data.code === 200) {
            // 将请求回来的数据使用，将load 样式关闭
            this.albumInfo = data.playlist
            this.load = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * 获取排行榜信息
     */
    _getIdxInfo (id) {
      api.idxListFn(id)
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.albumInfo = data.playlist
            this.idxComId = data.playlist.id
            this.load = false
          }
        })
    },
    /**
     * 获取专辑内容
     */
    _getDishInfo (id) {
      api.getDishInfoFn(id)
        .then(res => {
          console.log(res.data)
          const data = res.data
          if (data.code === 200) {
            this.albumInfo = data
            this.load = false
          }
        })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks || this.albumInfo.songs,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.albumInfo.tracks || this.albumInfo.songs
      })
    },
    getParams () {
      this.albumId = +this.$route.params.albumId || 0
      this.name = this.$route.params.name
      this.imgUrl = this.$route.params.imgUrl
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  },
  destroyed () {
    // 存储信息的数组
    this.albumInfo = []
    // 用来定义是否显示load加载组件
    this.load = true
  }
}
</script>

<style lang='less' scoped>
</style>
