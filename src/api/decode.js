import crypto from "crypto"

const _ = console.log
const key = "AlCfIvNuzsdjkh723"
const algorithm = "aes-128-cbc"

const encrypt = function(str, key) {
  const cipher = crypto.createCipher(algorithm, key)
  cipher.update(str, "utf8", "base64")
  return cipher.final("base64")
}

// const decrypt = function(str, key) {
//   const decipher = crypto.createDecipher(algorithm, key);
//   return decipher.update(str, 'base64', 'utf8') + decipher.final('utf8');
// };
//
// export const decode = base64 => {
//   // Decode base64
//   // const buff = new Buffer(base64, 'base64')
//   // const hash = buff.toString("utf8")
//
//   // const e = encrypt("hello world", key)
//   // _("[e]", e)
//
//   const d = decrypt(base64, key)
//   _("[d]", d)
//
// }

export const encode = str => {
  _("[i]", str)
  const e = encrypt(str, key)
  _("[e]", e)
  // const buff = new Buffer(e, "utf8")
  // const base64 = buff.toString("base64")
  // return base64
}
