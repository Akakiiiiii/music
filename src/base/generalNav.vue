<template>
  <nav class="phone-nav"
       ref="nav"
       :class="{height: height === 'all'}">
    <i class="phone iconzuojiantou"
       @click="returnPage"></i>
    <slot></slot>
    <slot name="artist"></slot>
    <i class="iconfont icon-fenxiang-1"
       v-if="height=='0'"></i>
    <!-- slot 插槽将不同页面的标题信息显示 -->
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'loginNav',
  props: {
    nav: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    ...mapGetters({ isFull: 'FULL_SCREEN' })
  },
  methods: {
    visible () {
      this.$refs.nav.style.visibility = 'visible'
    },
    hidden () {
      this.$refs.nav.style.visibility = 'hidden'
    },
    returnPage () {
      this.$emit('returnPage')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1550123_8ybvu6bwh0w.css");
@import url("//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css");

.phone-nav {
  display: flex;
  align-items: center;
  &.height {
    height: 1rem;
    line-height: 1rem;
  }
  .phone {
    font-size: 0.7rem;
    padding-right: 5px;
    font-weight: 300;
  }
  .icon-fenxiang-1 {
    font-size: 0.5rem;
  }
}
</style>
