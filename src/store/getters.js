const getters = {
  address: state => state.user.address,
  secondSecret: state => state.user.secondSecret,
  key: state => state.user.key,
  lang: state => state.user.lang
}

export default getters
