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
      showFake: false,
      textDom: null,
      wrapDom: null,
      timer: null
    }
  },
  mounted () {
    setTimeout(() => {
      console.log(this.$refs)
      console.log(this.$refs.songName.offsetWidth)
      this.textDom = this.$refs.songName
      console.log(this.textDom)
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
        if (this.wrapDom.scrollLeft <= this.textWidth) {
          this.wrapDom.scrollLeft++
        } else {
          this.wrapDom.scrollLeft = 0
        }
      }, 50)
    },
    destroyed () {
      this.wrapDom.scrollLeft = 0
      this.timer = null
    }
  }
}
</script>

<style lang="less" scoped>
.title-wrap {
  white-space: nowrap;
  overflow: hidden;
  width: 5.3rem;
}
.scrollWrap {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.title {
  display: inline;
  font-weight: 600;
  font-size: 0.35rem;
  color: #fff;
  padding-right: 0.5rem;
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
