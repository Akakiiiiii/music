
<template>
  <div class="container border-bottom">
    <ul class="icons-group">
      <li v-for="(item, index) in homeIcons"
          :icons="item"
          :key="index"
          is="icon"
          :width="true"
          :bgcolor="true"
          class="icon"></li>
    </ul>
  </div>
</template>

<script>
import { homeIcons } from 'getInfos/getData'
import icon from 'base/icon'
export default {
  name: 'homeIcons',
  data () {
    return {
      homeIcons
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.homeIcons = homeIcons()
    }
  },
  components: {
    icon
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/global.less");
@aaa: ~">>>";
.container {
  // 横向滚动条
  box-sizing: border-box;
  height: 1.8rem;
  padding: 0.2rem 0 0;
  overflow-x: scroll;
  .icons-group {
    // flex布局 溢出不换行
    height: 1.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;
    width: auto;
    min-width: 100%;
    @{aaa} .icon-text {
      color: #999d9c;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
