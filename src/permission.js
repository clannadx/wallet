import router from './router'
import store from './store'
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')
  if (token) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!store.getters.secret) {
        try {
          const result = await store.dispatch('GetInfo')
          if (result.data.success) {
            next()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
