import http from '../utils/axios'

export const login = (key) => {
  const data = {publicKey: key}
  return http({
    url: '/api/accounts/open2',
    method: 'post',
    data: data
  })
}
