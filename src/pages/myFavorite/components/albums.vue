<template>
  <div>
    <sublist-card :djSublist="albumsInfo"
                  :count="albumsNum"
                  type="albums"
                  title="收藏的专辑"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'
export default {
  name: '',
  props: {
    albumsInfo: {
      type: Array
    },
    albumsNum: {
      type: Number
    }
  },
  components: {
    sublistCard
  }
}
</script>

<style lang='less' scoped>
</style>
