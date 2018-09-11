<template>
  <a-layout id="components-layout-trigger">
    <a-layout-sider class="etm-side"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <router-link to="/home">
            <a-icon type="home" />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/person">
            <a-icon type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/application">
            <a-icon type="appstore" />
            <span>应用中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/block-production">
            <a-icon type="line-chart" />
            <span>区块生产</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/block-scan">
            <a-icon type="user" />
            <span>区块浏览</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/vote">
            <a-icon type="like-o" />
            <span>投票</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link to="transfer">
            <a-icon type="pay-circle-o" />
            <span>转账</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/miners-list">
            <a-icon type="pie-chart" />
            <span>SCV矿工列表</span>
          </router-link>
        </a-menu-item>
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
        <div>
          <a-breadcrumb :routes="routes">
            <template slot="itemRender" slot-scope="{route, params, routes, paths}">
              <span v-if="routes.indexOf(route) === routes.length - 1">
                {{route.meta.title}}
                <!-- {{paths}} -->
              </span>
              <router-link v-else :to="`/${paths.join('/')}`">
                {{route.meta.title}}
              </router-link>
            </template>
          </a-breadcrumb>
          <br/>
          {{$route.path}}
        </div>
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    // const {lang} = this.$route.params
    console.log(this.$route.matched)
    // console.log(routes.indexOf(route))
    return {
      collapsed: false,
      // basePath: '',
      routes: []
    }
  },
  created () {
    this.routes = this.$route.matched
  },
  watch: {
    '$route' (to, from) {
      this.routes = this.$route.matched
      console.log(this.routes)
    }
  },
  methods: {
    select (item) {
      console.log(1)
      console.log(item)
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
</style>
