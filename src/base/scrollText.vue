<template>
  <div>
    <div class="title-wrap">
      <div ref='scrollWrap'
           class="scrollWrap">
        <p class="title"
           ref="songName">{{name}}</p>
        <p class="title"
           v-if="showFake">{{name}}</p>
      </div>
      <p class="text">
        <span class="art"
              v-for="(item, index) in artist"
              :key="index">{{item.name}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
const REM = document.body.clientWidth * 0.14
export default {
  name: 'scrollText',
  props: ['name', 'artist'],
  data () {
    return {
      textWidth: 0,
      n: 1,
      showFake: false,
      textDom: null,
      wrapDom: null,
      timer: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.textDom = this.$refs.songName
      this.jugShowFake()
    }, 100)
  },
  methods: {
    jugShowFake () {
      // eslint-disable-next-line
      if (this.$refs.songName.offsetWidth > 5.2 * REM) {
        this.textWidth = this.$refs.songName.offsetWidth
        this.showFake = true
        this.wrapDom = this.$refs.scrollWrap
        this.scrollText()
      }
    },
    scrollText () {
      this.timer = setInterval(() => {
        if (this.wrapDom.scrollLeft <= this.textWidth + 4) {
          this.wrapDom.scrollBy(this.n, 0)
        } else {
          this.wrapDom.scrollTo(0, 0)
        }
      }, 35)
    }
  },
  beforeDestroy () {
    console.log('beforeD')
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.title-wrap {
  white-space: nowrap;
  overflow: hidden;
  width: 5.3rem;
  margin-right: 0.2rem;
}
.scrollWrap {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.title {
  display: inline;
  font-weight: 500;
  font-size: 0.35rem;
  color: #fff;
  padding-right: 2rem;
}
.text {
  font-size: 0.2rem;
  color: #bdc3c7;
  .art {
    &::after {
      content: "/";
    }
    &:last-child::after {
      content: "";
    }
  }
}
</style>
