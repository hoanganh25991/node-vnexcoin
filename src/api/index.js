export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"
import { decode } from "./encryptPayload"

export const SMS_MSG = "SMS_MSG"
const _ = console.log

/**
 * Main api handle
 * @param reqBody
 * @returns {Promise.<{resData: {}, statusCode: number}>}
 * @private
 */
export const api = async reqBody => {
  const { type } = reqBody
  let resData = {}
  let statusCode = 200

  switch (type) {
    case SMS_MSG: {
      const { payloadToken } = reqBody
      const { senderNumber, receiverNumber, msg, IMEI } = decode(payloadToken)
      resData = { received: true }
      break
    }
    default: {
      statusCode = 422
      resData = { msg: "UNKNOWN_CASE", data: { reqBody: reqBody } }
      break
    }
  }

  return { resData, statusCode }
}
