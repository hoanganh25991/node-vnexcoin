export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"
import { decrypt, encrypt } from "./encryptPayload"
import { store as saveSmsToDb } from "../mongodb/sms"
import { parseSms } from "../vcb-sms/parseSms"

export const SMS_MSG = "SMS_MSG"
export const ENCRYPT_PAYLOAD = "ENCRYPT_PAYLOAD"
export const DECRYPT_PAYLOAD = "DECRYPT_PAYLOAD"
const _ = console.log

/**
 * Main api handle
 * @param reqBody
 * @returns {Object.<{resData: {}, statusCode: number, tasks: array}>}
 */
export const api = reqBody => {
  const { type } = reqBody
  let resData = {}
  let statusCode = 200
  let tasks = []

  switch (type) {
    case SMS_MSG: {
      const { payloadToken } = reqBody
      const sms = decrypt(payloadToken)
      resData = { received: true }
      tasks.push(saveSmsToDb(sms))
      tasks.push(parseSms(sms))
      break
    }
    case ENCRYPT_PAYLOAD: {
      const { payload } = reqBody
      const payloadToken = encrypt(payload)
      resData = { payloadToken }
      break
    }
    case DECRYPT_PAYLOAD: {
      const { payloadToken } = reqBody
      const payload = decrypt(payloadToken)
      resData = { payload }
      break
    }
    default: {
      statusCode = 422
      resData = { msg: "UNKNOWN_CASE", data: { reqBody: reqBody } }
      break
    }
  }

  Promise.all(tasks)
    .then(() => _("[tasks] All tasks done"))
    .catch(err => _("[tasks][ERR]", err))

  return { resData, statusCode, tasks }
}
