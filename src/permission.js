// import router from './router'
// import store from './store'
// router.beforeEach(async (to, from, next) => {
//   const token = sessionStorage.getItem('etmUse')
//   if (token) {
//     console.log(store)
//     if (!store.getters.secondSecret) {
//       try {
//         const result = await store.dispatch('GetInfo')
//         console.log(result)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   } else {
//     next()
//   }
// })
