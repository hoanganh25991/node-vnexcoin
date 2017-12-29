import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()
const { ENCRYPT_PAYLOAD_KEY: key, ENCRYPT_PAYLOAD_ALGORITHM: algorithm } = process.env
const _ = console.log

// By default, cipher hash MD5 on key
const encryptAesBase64 = ({ str, algorithm, key }) => {
  const cipher = crypto.createCipher(algorithm, key)
  return cipher.update(str, "utf8", "base64") + cipher.final("base64")
}

const decryptAesBase64 = ({ str, algorithm, key }) => {
  const decipher = crypto.createDecipher(algorithm, key)
  return decipher.update(str, "base64", "utf8") + decipher.final("utf8")
}

export const decrypt = str => {
  const payloadStr = decryptAesBase64({ str, algorithm, key })
  return JSON.parse(payloadStr)
}

export const encrypt = obj => {
  const str = JSON.stringify(obj)
  return encryptAesBase64({ str, algorithm, key })
}
