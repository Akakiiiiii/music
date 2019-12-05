<template>
  <div class="container">
    <div class="info">
      <p>验证码已发送至</p>
      <p>
        <span>+86</span>
        <span>
          {{phone1}}
          <span class="middle">****</span>
          {{phone2}}
        </span>
      </p>
    </div>
    <div class="renew"
         @click="renew">{{placeholder}}</div>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'verifyInfo',
  // 通过 url 传过来的手机号，存取后进行验证码发送操作
  data () {
    return {
      phone1: 133,
      phone2: 1234,
      isSend: false,
      placeholder: '获取验证码'
    }
  },
  watch: {
    isSend () {
      let n = 60
      if (this.isSend) {
        let timer = setInterval(() => {
          if (n) {
            n--
            this.placeholder = `还剩${n}秒重新发送`
          } else {
            this.isSend = false
            clearInterval(timer)
            this.placeholder = '重新获取'
          }
        }, 1000)
      }
    }
  },
  methods: {
    /**
     * 发送验证码
     */
    _sendVerify () {
      let phone = this.$route.query.phone
      this.showPhone(phone)
      api.sendVerifyFn(phone)
        .then(res => {
          this.isSend = true
          console.log(res)
        })
        .catch(error => console.log(error))
    },
    /**
     * 截取手机号码进行页面显示
     */
    showPhone (phone) {
      this.phone1 = phone.slice(0, 3)
      this.phone2 = phone.slice(-4)
    },
    renew () {
      if (this.isSend) {
        // eslint-disable-next-line
        return
        // eslint-disable-next-line
      }
      else {
        const phone = this.$route.query.phone
        api.sendVerifyFn(phone)
          .then(res => {
            this.isSend = true
            console.log(res)
          })
          .catch(error => console.log(error))
      }
    }
  },
  created () {
    this._sendVerify()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  p:first-child {
    margin-bottom: 0.3rem;
  }
  span {
    color: #ccc;
    .middle {
      vertical-align: -3px;
    }
  }
  .renew {
    color: #1a73e8;
    cursor: pointer;
  }
}
</style>
