import {login, getAccount} from '@/api/account'
import {genPublicKey} from '@/utils/gen'

const user = {
  state: {
    accountInfo: {}, // 用户信息
    secret: '',
    lang: ''
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.accountInfo = {...info}
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    SET_SECONDSECRET: (state, secondSecret) => {
      state.accountInfo.secondSignature = secondSecret
    },
    LOGIN_OUT: (state) => {
      state.accountInfo = {}
    }
  },
  actions: {
    async login ({commit}, password) {
      const key = genPublicKey(password)
      const result = await login(key)
      return result
    },
    async loginOut ({commit}) {
      commit('LOGIN_OUT', {})
      commit('SET_SECRET', '')
      commit('SET_SECONDSECRET', '')
      sessionStorage.removeItem('etmUse')
      sessionStorage.removeItem('localeLanguage')
    },
    async GetInfo ({commit}) {
      const informations = sessionStorage.getItem('etmUse')
      const address = JSON.parse(informations).account.address
      const secret = JSON.parse(informations).account.secret
      const result = await getAccount(address)
      if (result.data.success) {
        const info = {...result.data.account, ...result.data.laststBlock, ...result.data.version}
        commit('SET_INFO', info)
        commit('SET_SECRET', secret)
        console.log(this.state)
      }
      return result
    }
  }
}
export default user
