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
