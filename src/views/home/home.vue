<template>
  <a-layout id="components-layout-trigger">
    <a-layout-sider class="etm-side"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div ref="login" class="logo" />
      <a-menu theme="dark" mode="inline"  >
        <router-link class="ant-menu-item" role="menuitem" tag="li" exact to="/home">
            <a-icon type="home" />
            <span>{{$t("router.home")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/person">
            <a-icon type="user" />
            <span>{{$t("router.person")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-production">
            <a-icon type="line-chart" />
            <span>{{$t("router.block_production")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-scan">
            <a-icon type="scan" />
            <span>{{$t("router.block_scan")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/vote">
             <a-icon type="like-o" />
            <span>{{$t("router.vote")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/transfer">
            <a-icon type="pay-circle-o" />
            <span>{{$t("router.transfer")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/application">
            <a-icon type="appstore" />
            <span>{{$t("router.app")}}</span>
        </router-link>
        <!-- <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/miners-list">
            <a-icon type="pie-chart" />
            <span>SCV矿工列表</span>
        </router-link> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => collapsed =!collapsed"
        />
        <a-icon class="trigger logout" :title="$t('router.loginOutTitle')" @click="logout" type="logout"/>
        <a-button size="small" @click="changeLang"  class="lang">{{ lang_text }}</a-button>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', paddingTop: '0', minHeight: '100vh' }">
        <div class="main-title">
          {{title}}
        </div>
        <transition name="page-toggle">
           <router-view/>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {mapActions} from 'vuex'
import {setup} from '@/lang'
export default {
  data () {
    return {
      collapsed: false,
      title: '',
      language: '',
      lang: ''
    }
  },
  created () {
    this.title = this.$route.meta.title
    this.language = sessionStorage.getItem('localeLanguage')
    this.lang = this.language !== 'en_GB'
  },
  computed: {
    lang_text () {
      return this.language === 'en_GB' ? '中文' : 'English'
    }
  },
  watch: {
    '$route' (to, from) {
      this.title = to.meta.title
    }
  },
  methods: {
    ...mapActions([
      'loginOut'
    ]),
    async logout () {
      await this.loginOut()
      this.$message.success(i18n.t('router.tip_success'))
      setTimeout(() => {
        location.reload()
      }, 500)
    },
    changeLang () {
      this.lang = !this.lang
      this.language = this.lang ? 'zh_CN' : 'en_GB'
      setup(this.language)
      location.reload()
    }
  }
}
</script>
<style scoped>
#components-layout-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-trigger .logo {
  height: 32px;
  background: url("../../assets/images/logo-white.png") no-repeat;
  margin: 16px 0;
}
#components-layout-trigger .etm-side{
 -webkit-box-shadow: 2px 0 6px rgba(0,21,41,.35);
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    min-height: 100vh;
    position: relative;
    z-index: 10;
}
#components-layout-trigger .logout{
  float: right;
}
#components-layout-trigger .lang{
  float: right;
  margin-top: 20px;
}
.main-title{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #858585;
  margin-bottom: 14px;
}
#components-layout-trigger .ant-layout-sider-collapsed .logo{
    background-image: url('../../assets/images/logoWithoutText.png');
    margin-left: 16px

}

@media(max-width: 600px){

}
</style>
