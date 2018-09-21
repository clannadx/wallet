<template>
  <div class="account">
    <p class="title">账号信息</p>
    <div class="list">
        <ul>
            <li><span>总余额：</span><span>{{unit(accounts.balance).toFixed(2)}} ETM</span></li>
            <li><span>地址：</span><span>{{accounts.address}}</span></li>
            <li><span>二级密码：</span><span>{{accounts.secondSignature ? '已设置' : '未设置'}}</span></li>
            <li><span>锁仓状态：</span><span>未锁仓</span></li>
            <li><span>公钥：</span><span>{{publicKey}}</span></li>
            <li><span>主秘钥二维码：</span><span><a href="javascript:;" @click="keyQrcode">点击获取</a></span></li>
            <li><span>地址二维码：</span><span><a href="javascript:;" @click="addressQrcode">点击获取</a></span></li>
        </ul>
    </div>
    <a-modal
      title="二维码"
      width='328px'
      v-model="visible"
      :footer="null"
    >
      <qrcode :value="qrvalue" :options="{ size: 280 }"></qrcode>
    </a-modal>
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
export default {
  name: 'Account',
  data () {
    return {
      accountInfo: {},
      visible: false,
      qrvalue: '',
      unit: unit
    }
  },
  created () {
  },
  computed: {
    accounts () {
      return this.$store.state.user.accountInfo || {}
    },
    publicKey () {
      const data = JSON.parse(sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    }
  },
  methods: {
    keyQrcode () {
      this.visible = true
      this.qrvalue = this.accounts.publicKey
    },
    addressQrcode () {
      this.visible = true
      this.qrvalue = this.accounts.address
    }
  }
}
</script>
<style lang="less" scoped>
.account{
  .title {
    line-height: 64px;
    color: #424242;
    font-size: 16px;
    // border-bottom:solid 1px  #e8e8e8;
    padding: 0 28px;
}
.list{
    padding: 10px 28px 0 28px;
}
.list>ul>li{
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  display: flex;
}

.list>ul>li>span:first-child{
    text-align: left;
    color: #343434;
    width: 100px;
}
.list>ul>li>span:last-child{
    color:#707070;
    flex: 1;
}
.list>ul>li>span>a{
    color: #5093fc;
}
}
</style>
