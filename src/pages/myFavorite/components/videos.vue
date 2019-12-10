<template>
  <div>
    <sublist-card :djSublist="videosInfo"
                  :bigImg="true"
                  type="video"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'

export default {
  name: '',
  props: {
    videosInfo: {
      type: Array
    },
    videosNum: {
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
