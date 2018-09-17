import {login, getAccount} from '@/api/account'

const user = {
  state: {
    address: '',
    secondSecret: false,
    key: '',
    lang: ''
  },
  mutations: {
    SET_ADDRESS: (state, address) => {
      state.address = address
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    SET_SECONDSECRET: (state, secondSecret) => {
      state.secondSecret = secondSecret
    },
    SET_KEY: (state, key) => {
      state.key = key
    }
  },
  actions: {
    async login ({commit}, key) {
      commit('SET_KEY', key)
      const result = await login(key)
      console.log(result)
      return result
    },
    async GetInfo ({commit}) {
      const secret = sessionStorage.getItem('etmUse')
      console.log(JSON.parse(secret))
      const address = JSON.parse(secret).account.address
      console.log(address)
      // const address = getAddress(publicKey)
      // commit('SET_KEY', publicKey)
      // const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor'
      // const address = genAddress(secret)
      const result = await getAccount(address)
      console.log(result)

      if (result.data.success) {
        // commit('SET_SECONDSECRET',)
      }
      return result
    }
  }
}
export default user
