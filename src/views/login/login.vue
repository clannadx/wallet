<template>
  <div class="w">
    <div class="login_main">
      <div class="head_img">
        <img src="../../assets/images/logo-black.png" />
      </div>
    <form v-if="loginStatus" class="login_form">
      <div style="position:relative;">
          <a-input :type="showPassword ? 'text' : 'password'" class="pwd_ipt" v-model="password" placeholder="输入主密码"/>
          <i class="icon" :class="toggelIcon" @click="showPassword=!showPassword"></i>
      </div>
      <div class="check_div">
        <a-checkbox  > 保持登录状态</a-checkbox>
      </div>
      <div>
        <a-select size="small" defaultValue="zh_CN" @change='changeLocale'  style="width: 120px" >
          <a-select-option value="zh_CN">中文简体</a-select-option>
          <a-select-option value="en_GB">英文</a-select-option>
        </a-select>
      </div>
      <div class="div_btn">
        <a-button @click="handleSubmit" type="primary">{{$t("login.loginBtn")}}</a-button>
        <a-button @click="register" >新账户</a-button>
      </div>
    </form>
    <form v-else class="register">
      <div>
        <h2>密码由浏览器本地生成，请妥善备份保存</h2>
        <div class="register-in">
           <a-textarea v-model="newPassword"  :autosize="{ minRows: 2, maxRows: 6 }" />
        </div>
        <div class="register-in">
           <a-textarea v-model="confirmPassword" placeholder="复制或输入上面的主密码" :autosize="{ minRows: 2, maxRows: 6 }" />
        </div>
        <div class="items">
            <div class="check_div">
            <a-checkbox v-model="checkitem01"  @change="onChange" > 我了解如果我丢失了密码，我将永远丢失我的资产</a-checkbox>
          </div>
            <div class="check_div">
            <a-checkbox v-model="checkitem02" > 我了解如果我丢失了密码，没有人能够将它恢复</a-checkbox>
          </div>
            <div class="check_div ">
            <a-checkbox v-model="checkitem03" > 我已经记住或者用其他方式保存了我的密码</a-checkbox>
          </div>
        </div>
      <div class="div_btn">
        <a-button @click="returnLogin" type="primary">返回登录</a-button>
        <a-button @click="createWallet">创建钱包</a-button>
      </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import bip39 from 'bip39'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      loginStatus: true,
      showPassword: false,
      password: '', // 主密码
      newPassword: '',
      confirmPassword: '',
      checkitem01: false, // 条款
      checkitem02: false,
      checkitem03: false
    }
  },
  computed: {
    toggelIcon () {
      return this.showPassword ? 'icon-hide' : 'icon-show'
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async handleSubmit () {
      if (!bip39.validateMnemonic(this.password)) {
        this.$message.error('密码格式不符合')
      } else {
        let result = await this.login(this.password)
        if (result.data.success) {
          result.data.account.secret = this.password
          const data = JSON.stringify(result.data)
          sessionStorage.setItem('etmUse', data)
          this.$message.success('登录成功')
          this.$router.push('/')
        } else {
          this.$message.error('登录失败')
        }
      }
    },
    register () {
      this.loginStatus = false
      this.newPassword = bip39.generateMnemonic()
    },
    returnLogin () {
      this.loginStatus = true
    },
    createWallet () {
      if (!this.checkitem01 || !this.checkitem02 || !this.checkitem03) {
        this.$message.error('请仔细阅读并勾选须知')
      } else if (this.confirmPassword !== this.newPassword) {
        this.$message.error('输入的主密码不一致')
      } else {
        this.loginStatus = true
      }
    },
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
      console.log(this.checkitem01)
    },
    changeLocale (lang) { // 切换语言
      // window.localStorage.setItem('localeLanguage', lang)
      this.$i18n.locale = lang
      // console.log(this.$i18n)
    }
  }
}
</script>

<style scoped>
.w {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}

.login_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.login_form {
  margin-top: 73px;
  font-size: 14px;
}

.pwd_ipt {
  font-size: 16px;
  width: 368px;
  color: #5e5e5e;
  padding-left: 4%;
  height: 40px;
  border-radius: 2px;
  padding-right: 40px;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}
.icon-show {
  background: url(../../assets/images/icon-14.png) center center no-repeat;
}
.icon-hide {
  background: url(../../assets/images/see.png) center center no-repeat;
  background-size: 100% 100%;
}
.check_ipt {
  display: none;
}

.login_form > div {
  height: 45px;
  line-height: 45px;
}
.check_div {
  color: #000;
}
.login_select {
  width: 103px;
  height: 24px;
  border-radius: 2px;
  border: solid 1px #cacaca;
}
.div_btn {
  width: 368px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.div_btn > button {
  width: 175px;
  height: 38px;
}
.register h2 {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
}
.register .register-in {
  text-align: center;
  margin-bottom: 15px;
}

.register .items {
  margin-bottom: 10px;
}
.register .items .check_div {
  margin-bottom: 2px;
  color: rgba(56, 56, 56, 1);
}
</style>
