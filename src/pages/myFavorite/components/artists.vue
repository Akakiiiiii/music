<template>
  <div>
    <sublist-card :djSublist="artistsInfo"
                  type="artists"
                  :circle="true"></sublist-card>
  </div>
</template>

<script>
import sublistCard from 'base/djSublistCard'

export default {
  name: '',
  props: {
    artistsInfo: {
      type: Array
    }
  },
  components: {
    sublistCard
  }
}
</script>

<style lang='less' scoped>
</style>
