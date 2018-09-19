import http from '../utils/axios'

export const login = (key) => {
  const data = {publicKey: key}
  return http({
    url: '/api/accounts/open2',
    method: 'post',
    data: data
  })
}

export const getAccount = (address) => {
  return http({
    url: '/api/accounts',
    method: 'get',
    params: {address}
  })
}
// 投票
export const getRecord = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'get',
    params
  })
}
export const submitVoter = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'put',
    data: params
  })
}
export const getTransaction = (params) => {
  return http({
    url: '/api/transactions',
    method: 'get',
    params
  })
}

export const setSecondSecret = (secret, secondSecret) => {
  const data = {secret: secret, secondSecret: secondSecret}
  return http({
    url: '/api/signatures',
    method: 'put',
    data: data
  })
}
