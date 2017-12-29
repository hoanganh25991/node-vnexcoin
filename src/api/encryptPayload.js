import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()
const { ENCRYPT_PAYLOAD_KEY: key, ENCRYPT_PAYLOAD_ALGORITHM: algorithm } = process.env
const _ = console.log

// By default, cipher hash MD5 on key
const encrypt = (str, key) => {
  const cipher = crypto.createCipher(algorithm, key)
  cipher.update(str, "utf8", "base64")
  return cipher.final("base64")
}

const decrypt = (str, key) => {
  const decipher = crypto.createDecipher(algorithm, key)
  decipher.update(str, "base64", "utf8")
  return decipher.final("utf8")
}

export const decode = str => {
  const payloadStr = decrypt(str, key)
  return JSON.parse(payloadStr)
}

export const encode = obj => {
  const str = JSON.stringify(obj)
  return encrypt(str, key)
}
