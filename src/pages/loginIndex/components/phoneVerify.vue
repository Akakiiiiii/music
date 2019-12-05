<template>
  <div class="wrapper">
    <verify-info></verify-info>
    <verify-code></verify-code>
  </div>
</template>

<script>
import verifyInfo from './verifyInfo'
import verifyCode from './verifyCode'
export default {
  name: 'phoneVerify',
  components: {
    verifyInfo,
    verifyCode
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>
