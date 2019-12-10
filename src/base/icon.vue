<template>
  <div class="icon-list"
       :class="{width}"
       @click="linkTo">
    <div class="icon"
         :class="{bgcolor}">
      <i :class="icons.icon"></i>
      <slot></slot>
    </div>
    <span class="icon-text">{{icons.text}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    icons: {
      type: [Object, Array]
    },
    width: {
      type: Boolean
    },
    bgcolor: {
      type: Boolean
    }
  },
  methods: {
    linkTo () {
      this.$emit('goPage')
    }
  }
}
</script>

<style lang='less' scoped>
// 这部分样式是对于 我的页面设置的
.width {
  min-width: 1.6rem;
  &:last-of-type > .icon {
    background: #ccc;
  }
}
.icon-list {
  // 每项 icon 样式
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  color: #000;
  .bgcolor {
    background: linear-gradient(
      to bottom,
      rgba(248, 80, 50, 1) 0%,
      rgba(239, 75, 57, 0.85) 67%,
      rgba(232, 68, 39, 0.77) 99%,
      rgba(232, 68, 39, 0.77) 100%
    );
  }
  .icon {
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 50%;
    text-align: center;
    position: relative;
    color: #fff;
    .home {
      font-size: 0.4rem;
    }
    .find {
      font-size: 0.5rem;
    }
    .dj {
      font-size: 0.4rem;
    }
    .login {
      font-size: 0.4rem;
      background-color: transparent;
      color: #ff1d11;
    }
  }
  .icon-text {
    font-size: 0.24rem;
  }
}
</style>
