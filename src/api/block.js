import http from '../utils/axios'

export const blocks = (params) => {
  return http({
    url: '/api/blocks',
    method: 'get',
    params
  })
}

export const searchBlock = (params) => {
  return http({
    url: '/api/blocks/get',
    method: 'get',
    params
  })
}

export const getHighest = () => {
  return http({
    url: '/api/blocks/getHeight',
    method: 'get'
  })
}

export const transactions = () => {
  return http({
    url: '/api/transactions',
    method: 'put'
  })
}

export const getDelegate = (params) => {
  return http({
    url: '/api/delegates/get',
    method: 'get',
    params
  })
}

export const setDelegate = (params) => {
  return http({
    url: '/api/delegates',
    method: 'put',
    data: params
  })
}
