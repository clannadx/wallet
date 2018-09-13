<template>
  <a-layout id="components-layout-trigger">
    <a-layout-sider class="etm-side"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" @click="handleClick" >
        <router-link class="ant-menu-item" role="menuitem" tag="li" exact to="/home">
            <a-icon type="home" />
            <span>首页</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/person">
            <a-icon type="user" />
            <span>个人中心</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/application">
            <a-icon type="appstore" />
            <span>应用中心</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-production">
            <a-icon type="line-chart" />
            <span>区块生产</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-scan">
            <a-icon type="user" />
            <span>区块浏览</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/vote">
             <a-icon type="like-o" />
            <span>投票</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/transfer">
            <a-icon type="pay-circle-o" />
            <span>转账</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/miners-list">
            <a-icon type="pie-chart" />
            <span>SCV矿工列表</span>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-icon class="trigger logout" type="logout"/>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', paddingTop: '0', minHeight: '100vh' }">
        <div class="main-title">
          {{title}}
        </div>
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      title: ''
    }
  },
  created () {
    this.title = this.$route.meta.title
  },
  watch: {
    '$route' (to, from) {
      this.title = to.meta.title
    }
  },
  methods: {
    handleClick (e) {
      console.log('click ', e)
      this.selectItem = e.keyPath
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
  margin: 16px;
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
.main-title{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #858585;
  margin-bottom: 14px;
}
</style>
