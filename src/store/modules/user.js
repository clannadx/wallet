import {login, getAccount} from '@/api/account'

const user = {
  state: {
    accountInfo: {},
    address: '',
    secondSecret: false,
    key: '',
    lang: ''
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.accountInfo = {...info}
    },
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
      const address = JSON.parse(secret).account.address
      const result = await getAccount(address)
      if (result.data.success) {
        const info = {...result.data.account, ...result.data.laststBlock, ...result.data.version}
        commit('SET_INFO', info)
        console.log(this.state)
      }

      if (result.data.success) {
        // commit('SET_SECONDSECRET',)
      }
      return result
    }
  }
}
export default user
