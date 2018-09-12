import '../../static/browserify-entanmo-min.js'
// 生成公钥
export function genPublicKey (secret) {
  return window.entanmoJs.crypto.getKeys(secret).publicKey
}

// 生成私钥
export function genPrivateKey (secret) {
  return window.entanmoJs.crypto.getKeys(secret).privateKey
}

// 生成地址
export function genAddress (secret) {
  let publicKey = window.entanmoJs.crypto.getKeys(secret).publicKey
  return window.entanmoJs.crypto.getNewAddress(publicKey)
}
