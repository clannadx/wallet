import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/404',
    //   component: () => import('@/views/404/404')
    // },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login')
    }, {
      path: '',
      component: () => import('@/views/home/home'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/first-view/first-view'),
          meta: {title: '首页'}
        }, {
          path: '/person',
          name: 'Person',
          component: () => import('@/views/person/person'),
          meta: {title: '个人中心'}
        }, {
          path: '/application',
          name: 'Application',
          component: () => import('@/views/application/application'),
          meta: {title: '应用中心'}
        }, {
          path: '/block-production',
          name: 'BlockProduction',
          component: () => import('@/views/block-production/block-production'),
          meta: {title: '区块生产'}
        }, {
          path: '/block-scan',
          name: 'BlockScan',
          component: () => import('@/views/block-scan/block-scan'),
          meta: {title: '区块浏览'}
        }, {
          path: '/vote',
          name: 'Vote',
          component: () => import('@/views/vote/vote'),
          meta: {title: '投票'}
        }, {
          path: '/transfer',
          name: 'Transfer',
          component: () => import('@/views/transfer/transfer'),
          meta: {title: '转账'}
        }, {
          path: '/miners-list',
          name: 'MinersList',
          component: () => import('@/views/miners-list/miners-list'),
          meta: {title: 'SCV矿工列表'}
        }
      ]
    }
    // {
    //   path: '*',
    //   redirect: '/404'
    //   // component: () => import('@/views/404/404')
    // }
  ]
})
