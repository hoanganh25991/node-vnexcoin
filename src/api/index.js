export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"
import { decode } from "./encryptPayload"
import { store as saveSmsToDb } from "../mongodb/sms"
import { parseSms } from "../vcb-sms/parseSms"

export const SMS_MSG = "SMS_MSG"
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
      const sms = decode(payloadToken)
      resData = { received: true }
      tasks.push(saveSmsToDb(sms))
      tasks.push(parseSms(sms))
      break
    }
    default: {
      statusCode = 422
      resData = { msg: "UNKNOWN_CASE", data: { reqBody: reqBody } }
      break
    }
  }

  return { resData, statusCode, tasks }
}
