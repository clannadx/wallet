<template>
  <div class="w">
    <div class="login_main">
      <div class="head_img">
        <img src="../assets/images/logo-black.png" />
      </div>
    <form v-if="loginStatus" class="login_form">
      <div style="position:relative;">
          <a-input placeholder="输入主密码"/>
      <!-- <input class="pwd_ipt" :type="showPassword ? 'text' : 'password'" placeholder="输入主密码" ref="pw"/> -->
            <i class="icon" :class="toggelIcon" @click="showPassword=!showPassword"></i>
      </div>
      <div class="check_div">
        <a-checkbox @change="onChange"> 保持登录状态</a-checkbox>
          <!-- <input class="check_ipt" type="checkbox" id="check" v-model="toggleSavePW"/>
        <label for="check" class="radioInput"></label>
        保持登录状态 -->
      </div>
      <div>
    <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack">中文简体</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
      <!-- <select class="login_select" name="">
      <option value="cn">中文简体</option>
      </select> -->
      </div>
      <div class="div_btn">
        <a-button type="primary">登录</a-button>
        <a-button>新账户</a-button>
        <!-- <button type="button" @click="login">登录</button><button @click="register" type="button">新账户</button> -->
      </div>
    </form>
    <form v-else class="register">
      <div>
        <h2>密码由浏览器本地生成，请妥善备份保存</h2>
        <div class="register-in">
           <a-textarea  :autosize="{ minRows: 2, maxRows: 6 }" />
            <!-- <textarea class="register-text" v-model="newPassword" name="" id=""></textarea> -->
        </div>
        <div class="register-in">
           <a-textarea placeholder="复制或输入上面的主密码" :autosize="{ minRows: 2, maxRows: 6 }" />
          <!-- <textarea class="register-text" v-model="confirmPassword" placeholder="复制或输入上面的主密码" name="" id="" ></textarea> -->
        </div>
        <div class="items">
            <div class="check_div">
              <!-- <input class="check_ipt" type="checkbox" id="checkitem01" v-model="checkitem01"/>
            <label for="checkitem01" class="radioInput"></label>
            我了解如果我丢失了密码，我将永远丢失我的资产 -->
            <a-checkbox @change="onChange"> 我了解如果我丢失了密码，我将永远丢失我的资产</a-checkbox>
          </div>
            <div class="check_div">
            <a-checkbox @change="onChange"> 我了解如果我丢失了密码，没有人能够将它恢复</a-checkbox>
              <!-- <input class="check_ipt" type="checkbox" id="checkitem02" v-model="checkitem02"/>
            <label for="checkitem02" class="radioInput"></label>
            我了解如果我丢失了密码，没有人能够将它恢复 -->
          </div>
            <div class="check_div ">
            <a-checkbox @change="onChange"> 我已经记住或者用其他方式保存了我的密码</a-checkbox>
              <!-- <input class="check_ipt" type="checkbox" id="checkitem03" v-model="checkitem03"/>
            <label for="checkitem03" class="radioInput"></label>
            我已经记住或者用其他方式保存了我的密码 -->
          </div>
        </div>

      <div class="div_btn">
        <a-button type="primary">返回登录</a-button>
        <a-button>创建钱包</a-button>
        <!-- <button type="button" @click="returnLogin" >返回登录</button><button @click="createWallet"  type="button">创建钱包</button> -->
      </div>
      </div>
    </form>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loginStatus: true
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

footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

footer > p {
  width: 100%;
  height: 53px;
  line-height: 53px;
  display: flex;
  justify-content: center;
  color: #ababab;
  font-size: 14px;
}

footer > p > span {
  padding: 0 19px;
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
  background-color: #f8f8f8;
  border-radius: 2px;
  padding-right: 40px;
  border: solid 1px #cacaca;
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
  background: url(../assets/images/icon-14.png) center center no-repeat;
}
.icon-hide {
  background: url(../assets/images/see.png) center center no-repeat;
  background-size: 100% 100%;
}
.check_ipt {
  display: none;
}

.radioInput {
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: inline-block;
  height: 16px;
  margin-right: 10px;
  margin-top: -2px;
  vertical-align: middle;
  width: 16px;
  line-height: 1;
  cursor: pointer;
  border-radius: 3px;
  background-size: 100% 100%;
}
.check_ipt:checked + label {
  background: url(../assets/images/checked.png) center center no-repeat;
  background-size: 18px 18px;
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
/* .div_btn {
  width: 368px;
  height: 42px;
  display: flex;
  justify-content: space-between;
}
.div_btn > button:first-child {
  width: 175px;
  height: 38px;
  background-color: #1890ff;
  border-radius: 2px;
  border: solid 1px #1890ff;
  color: #fff;
}
.div_btn > button:last-child {
  width: 175px;
  height: 38px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #cacaca;
} */

.register h2 {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
}
.register .register-in {
  text-align: center;
}
.register .register-text {
  background-color: #f8f8f8;
  border: 1px solid rgba(229, 229, 229, 1);
  width: 370px;
  height: 83px;
  margin: 0 0 18px 0;
  /* text-align: justify; */
  padding: 3px 6px;
  color: rgba(56, 56, 56, 1);
}
.register .items {
  margin-bottom: 10px;
}
.register .items .check_div {
  margin-bottom: 2px;
  color: rgba(56, 56, 56, 1);
}
</style>
