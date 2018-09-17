import router from './router'
import store from './store'
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('etmUse')
  if (token) {
    console.log(store)
    if (!store.getters.address) {
      try {
        const result = await store.dispatch('GetInfo')
        console.log(result)
        if (result.data.success) {
          next()
        }
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(1)
      next('/login')
    }
  }
})
