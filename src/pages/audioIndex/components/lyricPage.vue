<template>
  <div class="wrapper"
       ref="lyric">
    <div class="full"
         v-if="noLyric">{{noLyricText}}</div>
    <ul :style="{marginTop: marginTop}"
        v-if="!noLyric">
      <li v-for="(item, index) in lyricArray"
          :key="index"
          :class="{active: index === nowLyricIndex}">{{ item | setWords }}</li>
    </ul>
  </div>
</template>

<script>
const REM = document.body.clientWidth * 0.14
export default {
  name: '',
  props: {
    lyricArray: {
      type: Array
    },
    // 当前播放的歌词索引
    nowLyricIndex: {
      type: Number
    },
    noLyric: {
      type: Boolean
    },
    noLyricText: {
      type: String
    }
  },
  data () {
    return {
      marginTop: '0rem'
    }
  },
  filters: {
    setWords: function (val) {
      if (val && val.words) {
        return val.words
      }
    }
  },
  methods: {
    setCurrent (index) {
      // 这里求出中线的位置为 8.3 rem
      // 通过 歌词容器的高度 / 2 - 每个 li 的高度 / 2
      // 每次移动是移动一行歌词的高度，一行歌词高度是 0.6 rem
      let top = index * 0.6 * REM
      // this.marginTop = top + 'rem'
      this.$refs.lyric.scroll({
        top,
        left: 0,
        behavior: 'smooth' //  smooth(平滑滚动),instant(瞬间滚动),默认auto
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url("~styles/global.less");

.wrapper {
  height: 7.6rem;
  // box-sizing: border-box;
  margin: 0.6rem 0;
  color: #ccc;
  overflow: scroll;
  ul {
    margin: 0;
    padding: 0;
    padding-top: 3.5rem;
    list-style: none;
    text-align: center;
    /* ul元素的margin-top值变化，在0.7秒内完成 */
    transition: margin-top 0.7s;
    li {
      height: 0.6rem;
      line-height: 1.5;
      .ellipsis();
      &.active {
        color: #fff;
      }
    }
  }
  .full {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
