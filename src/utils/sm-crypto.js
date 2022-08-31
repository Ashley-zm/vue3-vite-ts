import sm from 'sm-crypto'
// const sm2 = require('sm-crypto').sm2 // 获取sm2对象
const sm2 = sm.sm2 // 获取sm2对象
const cipherMode = 0 // 选择加密策略，1 - C1C3C2，0 - C1C2C3，默认为1
const nodePublicKey = '04ab0e9416f2ef24342b8cf74c82214c796290dd4712420938f4dbc8fe3fc23d133ff3b577d0816c7c920a390294ca8af3b0cae344aa795686aa14357b015a1479' // 后台公钥
const vuePublicKey = '04bc36739ba80e5ac9c4ebd6660cabda268393a3585f44341fa156f8aed13ea742d87b78ca5d4837337e0490fdef5116b73f760f8a4b7bd25b077cccfa2fceb0b5' // 前端公钥
const vuePrivateKey = '0a3fc6d22faa56c5baa4f96260e27170bdfd3d1c46b8fcfe042367fc4d3b90d9' // 前端私钥
// 生成密钥对
// const keyPair=sm2.generateKeyPairHex()
// const PublicKey = keyPair.publicKey
// const PrivateKey = keyPair.privateKey
// console.log("公钥:",PublicKey,",私钥:",PrivateKey);
// post:vuePublicKey 加密
// get: nodePublicKey 解密

/**
 * SM2加密string数据
 * @param {string} data 原始数据
 * @returns {string} 加密后数据
 */
  function getSm2DataHexByString(data) {
  if (data && (typeof data === 'string') && data.constructor === String) {
    return '04' + sm2.doEncrypt(data, nodePublicKey, cipherMode)
  }
  return null
}

/**
 * SM2加密object数据
 * @param {Object} data 原始数据
 * @returns {string} 加密后数据
 */
 function getSm2DataHexByObject(data) {
  if (data) {
    return '04' + sm2.doEncrypt(JSON.stringify(data), nodePublicKey, cipherMode)
  }
  return null
}

/**
 * SM2解密数据
 * @param {string} dataHex 原始加密数据
 * @returns {string} 解密后数据
 */
  function getSm2DataByString(dataHex) {
  if (dataHex && (typeof dataHex === 'string') && dataHex.constructor === String) {
    dataHex = dataHex.substring(2).toLocaleLowerCase()
    return JSON.parse(sm2.doDecrypt(dataHex, vuePrivateKey, cipherMode)) 
  }
}
export default {getSm2DataHexByString,getSm2DataHexByObject,getSm2DataByString}